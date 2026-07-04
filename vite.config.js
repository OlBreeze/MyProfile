import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Путь для GitHub Pages (https://olbreeze.github.io/MyProfile/)
    base: '/MyProfile/',
    build: {
        outDir: 'build', // как у CRA, чтобы не менять deploy-скрипт
    },
    server: {
        port: 3000,
        open: true,
    },
});
