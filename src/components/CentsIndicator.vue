<template>
    <div class="cents-wrapper">
        <span class="caption">Cents</span>

        <div class="cents-bar">
            <div class="cents-bar-scale">
                <span>-50</span>
                <span>0</span>
                <span>+50</span>
            </div>

            <div class="cents-bar-track">
                <div class="cents-bar-indicator" :style="{ left: indicator + '%' }" />
            </div>

            <div class="cents-value">
                {{ display }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ cents: number }>()

const normalized = computed(() =>
    Math.max(-50, Math.min(50, props.cents))
)

const indicator = computed(() =>
    ((normalized.value + 50) / 100) * 100
)

const display = computed(() => {
    const c = Math.round(props.cents)
    return Number.isFinite(c) ? `${c > 0 ? '+' : ''}${c} cents` : '—'
})
</script>

<style scoped>
.cents-wrapper {
    margin-top: 1.2rem;
}

.cents-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.cents-bar-track {
    width: 230px;
    height: 0.7rem;
    border-radius: 999px;
    background: linear-gradient(90deg,
            rgba(248, 113, 113, .18),
            rgba(34, 197, 94, .32),
            rgba(248, 113, 113, .18));
    position: relative;
}

.cents-bar-indicator {
    position: absolute;
    top: 50%;
    width: 6px;
    height: 1.5rem;
    transform: translate(-50%, -50%);
    background: linear-gradient(180deg, #f97316, #ef4444);
}
</style>
