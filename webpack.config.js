const path = require('path');

module.exports = {
    entry: './src/CoveoPlatform.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: 'index.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'CoveoPlatform',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.build.json',
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
