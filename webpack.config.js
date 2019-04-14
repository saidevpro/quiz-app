var path = require('path'); 

module.exports = {
    mode: "development",
    entry: "./src",
    output: {
      path: path.resolve(__dirname, "public/assets"), 
      filename: "build.js",
      publicPath: "/assets/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env"
                    ]
                },
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
        ],
        extensions: [".js", ".json", ".jsx", ".css",".scss"],
    }
}; 