const path = require('path');

module.exports = {
    mode:"development",
    // mode:'production',
    entry: './src/scripts/myReactApp.jsx',
    output: {
        filename: 'bundled.myReactApp.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
        {
            test: /\.scss$/,
            use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
            ],
        },
        {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env','@babel/preset-react'],
                    plugins: [["@babel/plugin-transform-runtime",
                    {
                      "regenerator": true
                    }
                  ]]
                }
            }
        },
        {

            test: /\.(png|svg|jpg|jpeg|gif)$/i,
    
            type: 'asset/resource',
    
          },
        ],
    },

};