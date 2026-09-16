import { spawnSync } from 'node:child_process';
import path from 'node:path';
const script=path.resolve(path.dirname(new URL(import.meta.url).pathname),'generate-full-voice-pack.mjs');
const args=[script,'--previews-only',...process.argv.slice(2)];
const r=spawnSync(process.execPath,args,{stdio:'inherit',env:process.env});
process.exit(r.status??1);
