export function frequencyToNoteAndCents(freq: number) {
  const A4 = 440;
  const noteNumber = 12 * Math.log2(freq / A4) + 69;
  const rounded = Math.round(noteNumber);

  const notes = [
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
  const name = notes[((rounded % 12) + 12) % 12];
  const octave = Math.floor(rounded / 12) - 1;

  const idealFreq = A4 * Math.pow(2, (rounded - 69) / 12);
  const cents = 1200 * Math.log2(freq / idealFreq);

  return { name: `${name}${octave}`, cents };
}
