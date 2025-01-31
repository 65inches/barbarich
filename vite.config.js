import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import handlebars from "vite-plugin-handlebars";
import { helpers } from "./handlebars-helper";

export default defineConfig({
	root: "theme",
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "theme/partials"),
			compileOptions: {
				preventIndent: true,
			},
			helpers: helpers,
			reloadOnPartialChange: true,
		}),
		tailwindcss(),
	],
});
