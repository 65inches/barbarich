import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import handlebars from 'vite-plugin-handlebars';
import { helpers } from './handlebars-helper';

import fs from "fs";
import path from "path";

// Fonction pour récupérer tous les fichiers `.html` de `theme/`
const getHtmlFiles = () => {
  const themePath = path.resolve(__dirname, "theme");
  const files = fs.readdirSync(themePath);

  // Sélectionne tous les fichiers `.html`
  const entries = files
    .filter(file => file.endsWith(".html"))
    .reduce((acc, file) => {
      acc[file] = path.resolve(themePath, file);
      return acc;
    }, {});

  // Vérifier si la liste est vide (évite le crash de Rollup)
  if (Object.keys(entries).length === 0) {
    throw new Error("Aucun fichier .html trouvé dans le dossier theme/");
  }

  return entries;
};



export default defineConfig({
  root: 'theme',
  build: {
    outDir: "dist", // Dossier de sortie du build
    emptyOutDir: true, // Supprime l'ancien build avant de créer le nouveau
    rollupOptions: {
      input: getHtmlFiles(), // Assure que tous les fichiers `.html` sont bien inclus
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'theme/partials'),
      compileOptions: {
        preventIndent: true,
      },
      helpers: helpers,
      reloadOnPartialChange: true,
    }),
    tailwindcss(),
  ],
});
