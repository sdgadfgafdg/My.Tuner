<template>
    <div class="note-frequency">
        <span class="caption">Frequency</span>
        <div class="note-frequency-value">
            {{ frequency > 0 ? frequency.toFixed(2) + ' Hz' : '—' }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ frequency: number }>()
</script>

<style scoped>
.note-frequency {
    font-size: 1rem;
    color: var(--text-muted);
    margin-top: 0.75rem;
}

.note-frequency-value {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-main);
}
</style>
