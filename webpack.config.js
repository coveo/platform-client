const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const production = argv.mode === 'production';

    return {
        entry: './src/Entry.ts',
        devtool: production ? 'source-map' : 'inline-source-map',
        output: {
            filename: 'index.js',
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'PlatformClient',
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
        plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()],
    };
};
