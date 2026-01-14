<template>
  <div class="app-root">
    <div class="header-actions">
      <button class="btn btn--secondary mode-btn" @click="toggleMode">
        {{ mode === 'single' ? 'Basic Tuner' : 'Multi Tuner' }}
      </button>
    </div>

    <transition name="fade-slide" mode="out-in">
      <component :is="mode === 'single' ? SingleTuner : MultiTuner" :key="mode" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SingleTuner from './pages/SingleTuner.vue'
import MultiTuner from './pages/MultiTuner.vue'

const mode = ref<'single' | 'multi'>('multi')

const toggleMode = () => {
  mode.value = mode.value === 'single' ? 'multi' : 'single'
}
</script>

<style scoped>
.header-actions {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 100;
}

.mode-btn {
  font-size: 1rem !important;
  padding: 0.6rem 1.4rem;
}

.mode-icon {
  font-size: 1.2rem;
  opacity: 0.8;
}

.btn {
  position: relative;
  padding: 0.75rem 2.2rem;
  border-radius: var(--radius-full);
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
  color: var(--text-main);
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.app-root {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (max-width: 428px) {
  .header-actions {
    top: 0.75rem;
    right: 0.75rem;
  }

  .btn {
    padding: 0.60rem 1.2rem;
    font-size: 1.2rem;
    min-height: 36px;
  }

}

@media (max-width: 375px) {

  .header-actions {
    top: 0.75rem;
    right: 0.75rem;
  }

  .mode-btn {
    font-size: 0.8rem !important;
    padding: 0.45rem 0.9rem;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 1.1rem;
  }
}
</style>