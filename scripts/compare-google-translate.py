"""Comparison only: Google Translate (unofficial googletrans), Arabic -> Indonesian, direct.
5 requests in flight; checkpoints every 50; stops quietly after repeated errors."""
import asyncio, json, re, sys, os
from googletrans import Translator
data = json.load(open(sys.argv[1]))['verbs']
out = sys.argv[2]
done = json.load(open(out)) if os.path.exists(out) else {}
todo = [v for v in data if v['id'] not in done]
state = {'fails': 0, 'stop': False}
async def worker(q, t):
    while not state['stop']:
        try: v = q.get_nowait()
        except asyncio.QueueEmpty: return
        try:
            r = await asyncio.wait_for(t.translate(v['ar'], src='ar', dest='id'), 30)
            # Google echoes the input back when it blocks or fails: not a translation.
            if re.search('[\u0600-\u06FF]', r.text): raise ValueError('echoed input')
            done[v['id']] = r.text; state['fails'] = 0
        except Exception as e:
            state['fails'] += 1
            if state['fails'] >= 15: state['stop'] = True; print('stopping:', type(e).__name__, flush=True)
            await asyncio.sleep(3)
        if len(done) % 50 == 0:
            json.dump(done, open(out, 'w'), ensure_ascii=False); print(len(done), flush=True)
        await asyncio.sleep(0.3)
async def main():
    q = asyncio.Queue()
    for v in todo: q.put_nowait(v)
    t = Translator()
    await asyncio.gather(*[worker(q, t) for _ in range(5)])
    json.dump(done, open(out, 'w'), ensure_ascii=False); print('finished', len(done), flush=True)
asyncio.run(main())
