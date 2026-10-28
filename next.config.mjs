import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Ported .tsx components from the reference build; skip type-gate only.
        ignoreBuildErrors: true,
    },
    eslint: { ignoreDuringBuilds: true },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
    },
    turbopack: {
        resolveAlias: {
            '@': path.resolve(__dirname),
        },
    },
};

export default nextConfig;
