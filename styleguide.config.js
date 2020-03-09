const { version } = require("./package")

module.exports = {
  version,
  title: "forward head posture react",
  require: ["regenerator-runtime/runtime"],
  components: ["src/components/ForwardHeadPosture.js"],
  styleguideDir: "dist-docs",
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
  template: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href:
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        }
      ]
    }
  }
}
