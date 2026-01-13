import { ref, computed } from "vue";

export type TargetNote = {
  id: number;
  note: string;
  octave: number;
};

export type PresetConfigItem = {
  n: string;
  o: number;
};

export type Preset = {
  name: string;
  config: PresetConfigItem[];
};

export function useTargetNotes() {
  const targetNotes = ref<TargetNote[]>([
    { id: 1, note: "E", octave: 2 },
    { id: 2, note: "A", octave: 2 },
    { id: 3, note: "D", octave: 3 },
    { id: 4, note: "G", octave: 3 },
    { id: 5, note: "B", octave: 3 },
    { id: 6, note: "E", octave: 4 },
  ]);

  const activeTargetId = ref<number>(1);
  const tunedTargets = ref<string[]>([]);

  const noteOptions = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octaveOptions = [0, 1, 2, 3, 4, 5, 6, 7];

  const targetToString = (t: { note: string; octave: number }) =>
    `${t.note}${t.octave}`;

  const presets: Preset[] = [
    {
      name: "EADGBE",
      config: [
        { n: "E", o: 2 },
        { n: "A", o: 2 },
        { n: "D", o: 3 },
        { n: "G", o: 3 },
        { n: "B", o: 3 },
        { n: "E", o: 4 },
      ],
    },
    {
      name: "DADGBE",
      config: [
        { n: "D", o: 2 },
        { n: "A", o: 2 },
        { n: "D", o: 3 },
        { n: "G", o: 3 },
        { n: "B", o: 3 },
        { n: "E", o: 4 },
      ],
    },
    {
      name: "DAEAC#E",
      config: [
        { n: "D", o: 2 },
        { n: "A", o: 2 },
        { n: "E", o: 3 },
        { n: "A", o: 3 },
        { n: "C#", o: 4 },
        { n: "E", o: 4 },
      ],
    },
    {
      name: "CGDGBE",
      config: [
        { n: "C", o: 2 },
        { n: "G", o: 2 },
        { n: "D", o: 3 },
        { n: "G", o: 3 },
        { n: "B", o: 3 },
        { n: "D", o: 4 },
      ],
    },
    {
      name: "FACGCE",
      config: [
        { n: "F", o: 2 },
        { n: "A", o: 2 },
        { n: "C", o: 3 },
        { n: "G", o: 3 },
        { n: "C", o: 4 },
        { n: "E", o: 4 },
      ],
    },
    {
      name: "Custom",
      config: [
        { n: "D#", o: 2 },
        { n: "G", o: 2 },
        { n: "A#", o: 2 },
        { n: "F", o: 3 },
        { n: "A#", o: 3 },
        { n: "D", o: 4 },
      ],
    },
  ];

  const activeTarget = computed(
    () => targetNotes.value.find((t) => t.id === activeTargetId.value) ?? null
  );

  const applyPreset = (config: PresetConfigItem[]) => {
    tunedTargets.value = [];
    config.forEach((item, index) => {
      if (targetNotes.value[index]) {
        targetNotes.value[index].note = item.n;
        targetNotes.value[index].octave = item.o;
      }
    });
  };

  const markTuned = (noteName: string) => {
    if (!tunedTargets.value.includes(noteName)) {
      tunedTargets.value.push(noteName);
    }
  };

  return {
    targetNotes,
    activeTargetId,
    tunedTargets,
    noteOptions,
    octaveOptions,

    activeTarget,
    targetToString,
    presets,

    applyPreset,
    markTuned,
  };
}
