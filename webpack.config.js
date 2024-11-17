const path = require('path');

module.exports =
    {
        entry: './src/index.js',
        output: {
            filename: "bundler.js",
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
        },

        mode: "development",
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
    }