import { autoCorrelate } from './autoCorrelate'

export interface PitchDetectionResult {
    frequency: number
    valid: boolean
}

export function detectPitch(
    analyser: AnalyserNode,
    buffer: Float32Array,
    sampleRate: number
): PitchDetectionResult {
    // @ts-ignore
    analyser.getFloatTimeDomainData(buffer);

    const freq = autoCorrelate(buffer, sampleRate)

    if (!Number.isFinite(freq) || freq <= 0) {
        return { frequency: 0, valid: false }
    }

    if (freq < 50 || freq > 2000) {
        return { frequency: 0, valid: false }
    }

    return { frequency: freq, valid: true }
}
