import { ref, watch } from "vue";
import { frequencyToNoteAndCents } from "../utils/noteUtils";
import tunedSound from "../assets/sounds/tuned.mp3";
import type { Ref } from "vue";
import type { TargetNote } from "./useTargetNotes";

const COOLDOWN_MS = 3000;
const TUNE_TOLERANCE = 5;

type UseTunerFeedbackOptions = {
  currentFrequency: Ref<number | null | undefined>;
  activeTarget: Ref<TargetNote | null>;
  targetToString: (t: { note: string; octave: number }) => string;
  markTuned: (noteName: string) => void;
};

export function useTunerFeedback(options: UseTunerFeedbackOptions) {
  const successAudio = new Audio(tunedSound);
  const lastPlayedAt = ref(0);

  watch(options.currentFrequency, (freq) => {
    if (!freq || freq <= 0) return;

    const activeT = options.activeTarget.value;
    if (!activeT) return;

    const { name, cents } = frequencyToNoteAndCents(freq);
    const activeName = options.targetToString(activeT);

    if (name === activeName && Math.abs(cents) <= TUNE_TOLERANCE) {
      const now = Date.now();
      if (now - lastPlayedAt.value > COOLDOWN_MS) {
        successAudio.currentTime = 0;
        successAudio.play();
        lastPlayedAt.value = now;
        options.markTuned(activeName);
      }
    }
  });
}
