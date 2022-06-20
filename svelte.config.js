import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import windicss from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		vite: {
			plugins: [windicss()]
		},
		adapter: adapter()
	}
};

export default config;
