<template>
    <div class="btn-row">
        <button class="btn btn--primary" :disabled="isListening" @click="$emit('start')">
            <span class="btn-content">Start</span>
        </button>

        <button class="btn btn--secondary" :disabled="!isListening" @click="$emit('stop')">
            <span class="btn-content">Stop</span>
        </button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup lang="ts">
defineProps<{
    isListening: boolean
    error: string | null
}>()
defineEmits<{
    (e: 'start'): void
    (e: 'stop'): void
}>()
</script>

<style scoped>
.btn-row {
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.btn {
    position: relative;
    padding: 0.75rem 2.2rem;
    border-radius: var(--radius-full);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    border: 1px solid var(--glass-border);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
}

.btn--primary {
    background: var(--btn-primary-bg);
    color: white;
    box-shadow: var(--glass-shadow), var(--glass-reflection);
}

.btn--primary:hover:not(:disabled) {
    transform: translateY(-2px);
    background: var(--btn-primary-hover);
    box-shadow: var(--btn-primary-shadow), var(--glass-reflection);
}

.btn--secondary {
    background: var(--btn-secondary-bg);
    color: var(--text-muted);
    box-shadow: var(--glass-shadow);
}

.btn--secondary:hover:not(:disabled) {
    background: var(--btn-secondary-hover);
    color: var(--text-main);
    border-color: rgba(148, 163, 184, 0.4);
    transform: translateY(-2px);
}

.btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent);
    transition: 0.6s;
}

.btn:hover:not(:disabled)::after {
    left: 100%;
}

.btn:active:not(:disabled) {
    transform: translateY(1px);
    filter: brightness(0.9);
}

.btn:disabled {
    opacity: 0.2;
    cursor: not-allowed;
    backdrop-filter: none;
    box-shadow: none;
}

.error {
    color: var(--error);
    margin-top: 1rem;
    font-size: 0.85rem;
    font-weight: 500;
}
</style>