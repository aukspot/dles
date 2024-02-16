import adapter from "@sveltejs/adapter-static"; 
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
const dev = "production" === "development";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter({
            pages: "docs",
            assets: "docs"
        }),
        paths: {
            base: dev ? "" : "/dles",
        },
        // prerender: {
        //     entries: []
        // }
    },
    preprocess: [vitePreprocess()],
};

export default config;