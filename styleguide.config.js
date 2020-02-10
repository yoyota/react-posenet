const path = require("path")

module.exports = {
  title: "PoseNet React",
  pagePerSection: true,
  sections: [
    {
      name: "Documentation",
      content: "docs/Documentation.md",
      components: () => ["./src/components/PoseNet.js"]
    },
    {
      name: "Props examples",
      sections: [
        {
          name: "input",
          content: "docs/input.md",
          exampleMode: "expand"
        },
        {
          name: "onEstimate",
          content: "docs/onEstimate.md",
          exampleMode: "expand"
        }
      ],
      sectionDepth: 0
    }
  ],
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
  moduleAliases: {
    "react-posenet": path.resolve(__dirname, "src")
  }
}
