import { readFileSync, writeFileSync } from 'fs';

const inputCss = readFileSync('c:/Users/server/4Studentswbe/web/src/App.css', 'utf-8');

writeFileSync('c:/Users/server/4Studentswbe/claude skills/web-ui-upgrader-workspace/iteration-1/eval-1/without_skill/outputs/App.css', inputCss);
console.log('Eval 1 (without_skill baseline) completed');
