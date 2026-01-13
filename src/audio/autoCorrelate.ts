export function autoCorrelate(
  buffer: Float32Array,
  sampleRate: number
): number {
  const size = buffer.length;

  let rms = 0;
  for (let i = 0; i < size; i++) {
    const v = buffer[i];
    rms += v! * v!;
  }
  rms = Math.sqrt(rms / size);
  if (rms < 0.005) {
    return -1;
  }

  let mean = 0;
  for (let i = 0; i < size; i++) {
    mean += buffer[i]!;
  }
  mean /= size;
  for (let i = 0; i < size; i++) {
    buffer[i] = buffer[i]! - mean;
  }

  const minFreq = 50;
  const maxFreq = 2000;
  const maxLag = Math.min(size - 1, Math.floor(sampleRate / minFreq));
  const minLag = Math.max(1, Math.floor(sampleRate / maxFreq));

  const correlations = new Float32Array(maxLag + 1);

  for (let lag = 0; lag <= maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i < size - lag; i++) {
      sum += buffer[i]! * buffer[i + lag]!;
    }
    correlations[lag] = sum;
  }

  let d = minLag;
  while (d + 1 <= maxLag && correlations[d]! > correlations[d + 1]!) {
    d++;
  }

  let maxVal = -Infinity;
  let maxPos = -1;
  for (let i = d; i <= maxLag; i++) {
    if (correlations[i]! > maxVal) {
      maxVal = correlations[i]!;
      maxPos = i;
    }
  }

  if (maxPos <= 0) {
    return -1;
  }

  const fundamentalPeriod = maxPos;
  const frequency = sampleRate / fundamentalPeriod;
  return frequency;
}
