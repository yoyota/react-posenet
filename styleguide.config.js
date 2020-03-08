const path = require("path")

module.exports = {
  title: "Forward head posture react",
  components: ["src/components/ForwardHeadPosture.js"],
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
  styleguideDir: "dist-docs",
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
  },
  moduleAliases: {
    "react-forward-head-posture": path.resolve(__dirname, "src")
  }
}
