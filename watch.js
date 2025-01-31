import { $ } from 'bun';

await Promise.all([
  $`npx @tailwindcss/cli -i ./src/css/tailwind.css -o ./theme/style.css --content './theme/**/*.html' --watch`,
  $`npx esbuild ./src/js/main.js --target=esnext --bundle --outdir=./theme/js --out-extension:.js=.min.js --watch`,
  $`vite`,
]);
