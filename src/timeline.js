export function ownershipTick(event, ppq = 480, beats = 4, noteValue = 4) {
  return ((event.bar - 1) * beats + (event.beat - 1)) * (ppq * 4 / noteValue);
}
export function onsetTick(event, options) { return ownershipTick(event, options?.ppq, options?.beats, options?.noteValue) + (event.offset_ticks ?? 0); }
export function flattenTimeline(progression) {
  const ppq = progression.ppq ?? 480, byName = new Map((progression.sections ?? []).map(s => [s.name, s]));
  const form = progression.form === undefined ? [...byName.keys()] : progression.form; if(!Array.isArray(form)||form.length===0) throw new Error('Form must be nonempty'); let base = 0, out = [];
  for (const name of form) { const s=byName.get(name); if(!s) throw new Error('Unknown form section'); const beats=s.time_signature.beats, note=s.time_signature.note_value, barTicks=ppq*4*beats/note; if(!Number.isInteger(barTicks)||barTicks<=0) throw new Error('Invalid time signature'); for(const e of s.chords??[]){ if(!Number.isInteger(e.beat)||e.beat<1||e.beat>beats) throw new Error('Beat outside time signature'); const offset=e.offset_ticks??0; if(!Number.isInteger(offset)||Math.abs(offset)>=barTicks) throw new Error('Offset outside bar'); const onset=base+ownershipTick(e,ppq,beats,note)+offset; if(onset<0||onset>=base+s.bars*barTicks) throw new Error('Onset outside loop'); if(out.length && out.at(-1).onset_tick>=onset) throw new Error('Onsets must strictly increase'); out.push({...e,ownership_tick:base+ownershipTick(e,ppq,beats,note),onset_tick:onset}); } base+=s.bars*barTicks; }
  for(let i=0;i<out.length;i++){ const next=i+1<out.length?out[i+1].onset_tick:base; const duration=out[i].duration_ticks ?? next-out[i].onset_tick; if(!Number.isInteger(duration)||duration<=0||out[i].onset_tick+duration>next) throw new Error('Invalid duration'); out[i].duration_ticks_resolved=duration; }
  return {events:out,end_tick:base};
}
