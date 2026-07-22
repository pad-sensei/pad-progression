import json, pathlib, sys
from jsonschema import validate
p=pathlib.Path(sys.argv[1]); data=json.loads(p.read_text()); schema=json.loads(pathlib.Path(__file__).parent.joinpath('schema/progression.schema.json').read_text()); validate(data, schema)
for sec in data.get('sections',[]):
 for event in sec.get('chords',[]):
  s=event.get('midi_snapshot')
  if s is not None and (not s or s != sorted(set(s))): raise ValueError('midi_snapshot must be nonempty ascending unique')
print('[PASS] schema and midi_snapshot checks')
