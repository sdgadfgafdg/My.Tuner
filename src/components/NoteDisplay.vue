<template>
    <div class="note-wrapper">
        <div class="note-circle">
            <div class="note-text">
                <div class="note-text-main">{{ main }}</div>
                <div class="note-text-octave">{{ octave }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ note: string | null }>()

const main = computed(() =>
    props.note?.match(/^([A-G]#?)/)?.[1] ?? '—'
)

const octave = computed(() =>
    props.note ? `Octave ${props.note.match(/(-?\d+)$/)?.[1]}` : ''
)
</script>

<style scoped>
.note-wrapper {
    margin-top: 1.75rem;
}

.note-circle {
    width: 200px;
    height: 200px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    background:
        radial-gradient(circle at 30% 18%, rgba(248, 250, 252, 0.22), transparent 60%),
        radial-gradient(circle at 75% 80%, rgba(56, 189, 248, 0.35), transparent 55%),
        radial-gradient(circle at 0 100%, rgba(79, 70, 229, 0.42), transparent 65%),
        #020617;
    box-shadow:
        0 18px 40px rgba(15, 23, 42, 0.95),
        0 0 0 1px rgba(148, 163, 184, 0.4),
        inset 0 0 18px rgba(15, 23, 42, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.note-circle::before {
    content: "";
    position: absolute;
    inset: 18px;
    border-radius: inherit;
    border: 1px solid rgba(148, 163, 184, 0.35);
}

.note-text-main {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: 0.12em;
}

.note-text-octave {
    font-size: 0.9rem;
    color: var(--text-muted);
}

@media (max-width: 428px) {
    .note-wrapper {
        margin-top: 0.9rem;
    }

    .note-circle {
        width: 160px;
        height: 160px;
        margin: 0 auto 1rem;
    }

    .note-text-main {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.12em;
    }

    .note-text-octave {
        font-size: 0.75rem;
        color: var(--text-muted);
    }
}

@media (max-width: 375px) {
    .note-wrapper {
        margin-top: 0.85rem;
    }

    .note-circle {
        width: 150px;
        height: 150px;
        margin: 0 auto 1rem;
    }

    .note-text-main {
        font-size: 2.4rem;
        font-weight: 700;
        letter-spacing: 0.12em;
    }

    .note-text-octave {
        font-size: 0.7rem;
        color: var(--text-muted);
    }
}
</style>
