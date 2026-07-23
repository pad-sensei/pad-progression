export function readProgression(input) {
  if (!input || !['0.1', '0.2'].includes(input.format_version)) throw new Error('Unsupported progression format');
  for (const section of input.sections ?? []) for (const event of (section.events ?? section.chords ?? [])) {
    const snapshot = event.midi_snapshot;
    if (snapshot !== undefined && (!Array.isArray(snapshot) || snapshot.length === 0 || snapshot.some((n, i) => !Number.isInteger(n) || n < 0 || n > 127 || (i && n <= snapshot[i - 1])))) throw new Error('Invalid midi_snapshot');
  }
  const out = structuredClone(input);
  const known = new Set(['bar','beat','chord','degree','function','offset_ticks','duration_ticks','midi_snapshot','extras']);
  for (const section of out.sections ?? []) for (const event of (section.events ?? section.chords ?? [])) {
    const extras = structuredClone(event.extras ?? {});
    for (const key of Object.keys(event)) if (!known.has(key)) { extras[key] = event[key]; delete event[key]; }
    if (Object.keys(extras).length) event.extras = extras;
  }
  return out;
}

export function writeProgression(value) { return structuredClone(value); }
