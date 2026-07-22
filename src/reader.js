export function readProgression(input) {
  if (!input || !['0.1', '0.2'].includes(input.format_version)) throw new Error('Unsupported progression format');
  for (const section of input.sections ?? []) for (const event of (section.events ?? section.chords ?? [])) {
    const snapshot = event.midi_snapshot;
    if (snapshot !== undefined && (!Array.isArray(snapshot) || snapshot.length === 0 || snapshot.some((n, i) => !Number.isInteger(n) || n < 0 || n > 127 || (i && n <= snapshot[i - 1])))) throw new Error('Invalid midi_snapshot');
  }
  return structuredClone(input);
}

export function writeProgression(value) { return structuredClone(value); }
