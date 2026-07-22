import test from 'node:test'; import assert from 'node:assert/strict'; import {readProgression} from '../src/reader.js';
const base={format_version:'0.2',sections:[{chords:[{midi_snapshot:[60,64,67],future:'kept'}]}]};
test('snapshot round trips',()=>assert.deepEqual(readProgression(base),base));
for (const bad of [[],[64,60],[60,60],[-1],[128]]) test('reject invalid snapshot',()=>assert.throws(()=>readProgression({format_version:'0.2',sections:[{chords:[{midi_snapshot:bad}]}]})));
