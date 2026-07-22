import test from 'node:test'; import assert from 'node:assert/strict'; import {flattenTimeline} from '../src/timeline.js';
const p={ppq:480,sections:[{name:'A',bars:1,time_signature:{beats:4,note_value:4},chords:[{bar:1,beat:1,chord:'C'},{bar:1,beat:3,chord:'F'}]}],form:['A']};
test('projects ownership and onset ticks',()=>assert.deepEqual(flattenTimeline(p).events.map(e=>e.onset_tick),[0,960]));
test('rejects duplicate onsets',()=>assert.throws(()=>flattenTimeline({...p,sections:[{...p.sections[0],chords:[{bar:1,beat:1,chord:'C'},{bar:1,beat:1,chord:'F'}]}]})));
test('rejects overlapping duration',()=>assert.throws(()=>flattenTimeline({...p,sections:[{...p.sections[0],chords:[{bar:1,beat:1,chord:'C',duration_ticks:1200},{bar:1,beat:3,chord:'F'}]}]})));
test('rejects bar-sized offset and reverse input',()=>{assert.throws(()=>flattenTimeline({...p,sections:[{...p.sections[0],chords:[{bar:1,beat:1,chord:'C',offset_ticks:1920}]}]}));assert.throws(()=>flattenTimeline({...p,sections:[{...p.sections[0],chords:[{bar:1,beat:3,chord:'F'},{bar:1,beat:1,chord:'C'}]}]}));});
