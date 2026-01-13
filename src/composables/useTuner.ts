import { ref, onBeforeUnmount } from "vue";
import { detectPitch } from "../audio/pitchDetection";
import { frequencyToNoteAndCents } from "../utils/noteUtils";

export function useTuner() {
    const isListening = ref(false);
    const error = ref<string | null>(null);
    const currentFrequency = ref(0);
    const detectedNote = ref<string | null>(null);
    const currentCents = ref(0);

    let audioContext: AudioContext | null = null;
    let analyserNode: AnalyserNode | null = null;
    let dataArray: Float32Array | null = null;
    let mediaStream: MediaStream | null = null;
    let rafId: number | null = null;

    const SMOOTHING = 0.15;
    const UPDATE_MS = 25;
    let smoothed = 0;
    let lastUpdate = 0;

    const freqBuffer: number[] = [];
    const BUFFER_SIZE = 5;

    function analyze(time: number) {
        if (!analyserNode || !audioContext || !dataArray) return;

        const { frequency, valid } = detectPitch(
            analyserNode,
            dataArray,
            audioContext.sampleRate
        );

        if (valid && frequency > 0) {
            freqBuffer.push(frequency);
            if (freqBuffer.length > BUFFER_SIZE) freqBuffer.shift();

            const avgFreq = freqBuffer.reduce((a, b) => a + b, 0) / freqBuffer.length;

            smoothed =
                smoothed === 0
                    ? avgFreq
                    : SMOOTHING * avgFreq + (1 - SMOOTHING) * smoothed;

            if (time - lastUpdate > UPDATE_MS) {
                currentFrequency.value = smoothed;
                const { name, cents } = frequencyToNoteAndCents(smoothed);
                detectedNote.value = name;
                currentCents.value = cents;
                lastUpdate = time;
            }
        } else {
            if (freqBuffer.length > 0) freqBuffer.shift();

            if (freqBuffer.length === 0) {
                currentFrequency.value = 0;
                detectedNote.value = null;
                currentCents.value = 0;
                smoothed = 0;
            }
        }

        rafId = requestAnimationFrame(analyze);
    }

    async function startListening() {
        try {
            error.value = null;
            audioContext = new (window.AudioContext ||
                (window as any).webkitAudioContext)();

            mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                },
            });

            const source = audioContext.createMediaStreamSource(mediaStream);
            analyserNode = audioContext.createAnalyser();

            analyserNode.fftSize = 4096;
            dataArray = new Float32Array(analyserNode.fftSize);

            source.connect(analyserNode);
            isListening.value = true;

            rafId = requestAnimationFrame(analyze);
        } catch (e) {
            console.error(e);
            error.value = "Не удалось получить доступ к микрофону";
            stopListening();
        }
    }

    function stopListening() {
        isListening.value = false;
        currentFrequency.value = 0;
        currentCents.value = 0;
        smoothed = 0;
        freqBuffer.length = 0;

        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }

        mediaStream?.getTracks().forEach((t) => t.stop());
        if (audioContext?.state !== "closed") {
            audioContext?.close();
        }

        audioContext = null;
        analyserNode = null;
        dataArray = null;
    }

    onBeforeUnmount(stopListening);

    return {
        isListening,
        error,
        currentFrequency,
        detectedNote,
        currentCents,
        startListening,
        stopListening,
    };
}
