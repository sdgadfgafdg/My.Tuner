<template>
    <div class="container">
        <h1 class="container-title">Multi Tuner</h1>

        <div class="multi-layout">
            <div class="targets">
                <div v-for="t in targetNotes" :key="t.id" class="target-row" :class="{
                    active: t.id === activeTargetId,
                    tuned: tunedTargets.includes(targetToString(t))
                }">
                    <button class="target-circle" @click="activeTargetId = t.id">
                        {{ t.note }}{{ t.octave }}
                    </button>

                    <div class="target-selects">
                        <select v-model="t.note">
                            <option v-for="n in noteOptions" :key="n" :value="n">{{ n }}</option>
                        </select>
                        <select v-model.number="t.octave">
                            <option v-for="o in octaveOptions" :key="o" :value="o">{{ o }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="tuner-center">
                <TunerControls :isListening="isListening" :error="error" @start="startListening"
                    @stop="stopListening" />
                <NoteDisplay :note="detectedNote" />
                <CentsIndicator :cents="currentCents" />
                <FrequencyDisplay :frequency="currentFrequency" />
            </div>

            <div class="presets-panel">
                <h3 class="presets-title">Presets</h3>

                <div class="presets-list presets-list-desktop">
                    <button v-for="preset in presets" :key="preset.name" class="preset-btn"
                        @click="applyPreset(preset.config)">
                        {{ preset.name }}
                    </button>
                </div>

                <div class="presets-select-mobile">
                    <select v-model="selectedPresetName" @change="onPresetChange">
                        <option disabled value="">Choose an option...</option>
                        <option v-for="preset in presets" :key="preset.name" :value="preset.name">
                            {{ preset.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTuner } from '../composables/useTuner'
import { useTargetNotes } from '../composables/useTargetNotes'
import { useTunerFeedback } from '../composables/useTunerFeedback'
import { usePresets } from '../composables/usePresets'

import TunerControls from '../components/TunerControls.vue'
import NoteDisplay from '../components/NoteDisplay.vue'
import CentsIndicator from '../components/CentsIndicator.vue'
import FrequencyDisplay from '../components/FrequencyDisplay.vue'

const {
    isListening,
    error,
    currentFrequency,
    detectedNote,
    currentCents,
    startListening,
    stopListening,
} = useTuner()

const {
    targetNotes,
    activeTargetId,
    tunedTargets,
    noteOptions,
    octaveOptions,
    targetToString,
    presets,
    activeTarget,
    applyPreset,
    markTuned,
} = useTargetNotes()

const { selectedPresetName, onPresetChange } = usePresets(presets, applyPreset)

useTunerFeedback({
    currentFrequency,
    activeTarget,
    targetToString,
    markTuned,
})
</script>

<style scoped>
.container {
    height: 60%;
    width: 100%;
    align-self: center;
    justify-self: center;
    max-width: 900px;
    padding: 1.75rem 1.5rem 2rem;
    margin: 1rem;
    text-align: center;
    background:
        radial-gradient(circle at 0 0, rgba(79, 70, 229, 0.24), transparent 58%),
        radial-gradient(circle at 100% 0, rgba(14, 165, 233, 0.16), transparent 50%),
        var(--bg-elevated);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-soft);
}

.container-title {
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 3rem;
}

.multi-layout {
    display: grid;
    grid-template-columns: 180px 1fr 180px;
    gap: 1.5rem;
    align-items: start;
}

.targets {
    display: flex;
    flex-direction: column;
    justify-self: center;
    gap: 1.1rem;
}

.target-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.target-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-main);
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: var(--glass-blur);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--glass-shadow);
}

.target-row.active .target-circle {
    background: var(--note-active-bg);
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: var(--note-active-shadow);
    transform: scale(1.05);
}

.target-row.tuned .target-circle {
    background: var(--note-tuned-bg);
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: var(--note-tuned-shadow);
}

.target-selects {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.target-selects select {
    font-size: 0.75rem;
    padding: 3px 6px;
    background-color: var(--input-bg);
    color: var(--text-muted);
    border: 1px solid var(--input-border);
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;

    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 4px center;
    padding-right: 20px;
}

.target-selects select:hover {
    border-color: rgba(148, 163, 184, 0.4);
    color: var(--text-main);
}

.target-selects select:focus {
    border-color: var(--accent);
    background-color: rgba(15, 23, 42, 0.9);
    color: var(--text-main);
    box-shadow: 0 0 0 2px var(--accent-soft);
}

.target-selects select option {
    background-color: #0f172a;
    color: var(--text-main);
    padding: 10px;
}

.target-row.active .target-selects select {
    border-color: rgba(99, 102, 241, 0.4);
}

.presets-panel {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    padding: 1.2rem;
    padding-top: 0;
    border-radius: var(--radius-lg);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
}

.presets-title {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
    text-align: center;
}

.presets-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.preset-btn {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--text-muted);
    padding: 0.7rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s ease;
    backdrop-filter: blur(4px);
}

.preset-btn:hover {
    background: var(--glass-bg-hover);
    color: var(--text-main);
    border-color: var(--accent);
    transform: translateY(-2px);
}

@media (max-width: 428px) {
    .container {
        width: 100%;
        max-width: 428px;
        padding: 1rem 1.2rem 1.5rem;
        padding-bottom: 0.6rem;
        box-sizing: border-box;
        height: 80vh;
        display: flex;
        flex-direction: column;
    }

    .container-title {
        font-size: 1.2rem;
        letter-spacing: 0.08em;
        margin-bottom: 0.6rem;
    }

    .multi-layout {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tuner-center {
        width: 100%;
        margin: 0 auto;
        flex: 0 0 auto;
    }

    .presets-panel {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.4rem;
        padding: 0.1rem 0.8rem;
        margin-top: 0.75rem;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        border-radius: var(--radius-lg);
        border: 1px solid var(--glass-border);
        box-shadow: var(--glass-shadow);
        flex: 0 0 auto;
    }

    .presets-title {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: var(--text-muted);
        white-space: nowrap;
    }

    .presets-list-desktop {
        display: none;
    }

    .presets-select-mobile {
        display: block;
        flex: 1;
    }

    .presets-select-mobile select {
        width: 100%;
        font-size: 0.75rem;
        padding: 0.35rem 0.75rem;
        background-color: var(--input-bg);
        color: var(--text-muted);
        border: 1px solid var(--input-border);
        border-radius: 8px;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        padding-right: 24px;
    }

    .presets-select-mobile select:hover {
        border-color: rgba(148, 163, 184, 0.4);
        color: var(--text-main);
    }

    .presets-select-mobile select:focus {
        border-color: var(--accent);
        background-color: rgba(15, 23, 42, 0.9);
        color: var(--text-main);
        box-shadow: 0 0 0 2px var(--accent-soft);
    }

    .presets-select-mobile select option {
        background-color: #0f172a;
        color: var(--text-main);
        padding: 10px;
    }

    .targets {
        width: 100%;
        margin: 0.3rem 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.5rem;
        align-content: flex-start;
    }

    .target-row {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
    }

    .target-circle {
        width: 40px;
        height: 40px;
        font-size: 0.8rem;
        flex-shrink: 0;
        justify-self: flex-start;
    }

    .target-selects {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        justify-content: flex-end;
    }

    .target-selects select {
        flex: 1;
        min-width: 0;
        font-size: 0.7rem;
        padding: 2px 6px;
        padding-right: 16px;
    }

    .preset-btn {
        font-size: 0.75rem;
        padding: 0.4rem 0.6rem;
    }
}
</style>