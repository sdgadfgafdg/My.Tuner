import { ref, computed } from "vue";
import type { Preset, PresetConfigItem } from "./useTargetNotes";

export function usePresets(
  presets: Preset[],
  applyPreset: (config: PresetConfigItem[]) => void
) {
  const selectedPresetName = ref<string>("");

  const selectedPreset = computed(() =>
    presets.find((p) => p.name === selectedPresetName.value)
  );

  const onPresetChange = () => {
    if (selectedPreset.value) {
      applyPreset(selectedPreset.value.config);
    }
  };

  return {
    selectedPresetName,
    onPresetChange,
  };
}
