import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/Home-Assistant-Mail-And-Packages-Custom-Card.js',
    output: {
        file: 'dist/Home-Assistant-Mail-And-Packages-Custom-Card.js',
        format: 'es',
    },
    plugins: [nodeResolve()],
};

