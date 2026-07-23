import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const data = require('../vendor/pad-core/data.js');
const theory = require('../vendor/pad-core/theory.js');
const freeze = value => { if (value && typeof value === 'object') { for (const child of Object.values(value)) freeze(child); Object.freeze(value); } return value; };
export const nodeTheoryAdapter = Object.freeze({
  parseChordName: theory.padParseChordName,
  getDiatonicTetrads: theory.padGetDiatonicTetrads,
  SCALES: freeze(structuredClone(data.SCALES)),
  getHarmonicFunction: () => null,
});
