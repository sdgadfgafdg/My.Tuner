<template>
    <div class="container">
        <h1 class="container-title">Chromatic Tuner</h1>

        <TunerControls :isListening="isListening" :error="error" @start="startListening" @stop="stopListening" />

        <NoteDisplay :note="detectedNote" />

        <CentsIndicator :cents="currentCents" :frequency="currentFrequency" />

        <FrequencyDisplay :frequency="currentFrequency" />
    </div>
</template>

<script setup lang="ts">
import TunerControls from "../components/TunerControls.vue";
import NoteDisplay from "../components/NoteDisplay.vue";
import CentsIndicator from "../components/CentsIndicator.vue";
import FrequencyDisplay from "../components/FrequencyDisplay.vue";

import { useTuner } from "../composables/useTuner";

const {
    isListening,
    error,
    currentFrequency,
    detectedNote,
    currentCents,
    startListening,
    stopListening,
} = useTuner();
</script>

<style scoped>
.container {
    height: 60%;
    width: 100%;
    align-self: center;
    justify-self: center;
    max-width: 420px;
    padding: 1.75rem 1.5rem 2rem;
    margin: 1rem;
    text-align: center;
    background: radial-gradient(circle at 0 0,
            rgba(79, 70, 229, 0.24),
            transparent 58%),
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

@media (max-width: 428px) {
    .container {
        height: 60%;
        width: 100%;
        max-width: 400px;
        padding: 1rem 1.2rem 1.5rem;
        margin: 0.75rem;
    }

    .container-title {
        text-align: center;
        font-size: 1.2rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
    }
}

@media (max-width: 375px) {
    .container {
        height: 60%;
        width: 100%;
        max-width: 400px;
        padding: 0.9rem 1.2rem 1.4rem;
        margin: 0.75rem;
    }

    .container-title {
        text-align: center;
        font-size: 1.1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 1.4rem;
    }
}
</style>
