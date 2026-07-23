import test from 'node:test'; import assert from 'node:assert/strict'; import {readProgression} from '../src/reader.js';
const base={format_version:'0.2',sections:[{chords:[{midi_snapshot:[60,64,67],future:'kept'}]}]};
test('snapshot round trips and unknown fields move to extras',()=>assert.deepEqual(readProgression(base),{format_version:'0.2',sections:[{chords:[{midi_snapshot:[60,64,67],extras:{future:'kept'}}]}]}));
for (const bad of [[],[64,60],[60,60],[-1],[128]]) test('reject invalid snapshot',()=>assert.throws(()=>readProgression({format_version:'0.2',sections:[{chords:[{midi_snapshot:bad}]}]})));
test('reader preserves ownership fields for section-boundary anticipation',()=>{const input={format_version:'0.2',sections:[{name:'B',chords:[{bar:1,beat:1,chord:'F',offset_ticks:-120}]}]};assert.deepEqual(readProgression(input),input);});
