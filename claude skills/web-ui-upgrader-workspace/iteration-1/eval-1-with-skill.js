import { readFileSync, writeFileSync } from 'fs';

const inputCss = readFileSync('c:/Users/server/4Studentswbe/web/src/App.css', 'utf-8');

const outputCss = inputCss.replace(
  'border: 2px solid transparent;',
  'border: 1px solid rgba(255, 255, 255, 0.1);\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(5px);'
).replace(
  'background: var(--accent-bg);',
  'background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));'
);

writeFileSync('c:/Users/server/4Studentswbe/claude skills/web-ui-upgrader-workspace/iteration-1/eval-1/with_skill/outputs/App.css', outputCss);
console.log('Eval 1 (with_skill) completed');
