require("ignore-styles");

require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    //"@babel/plugin-transform-modules-commonjs",
    [
      "transform-assets",
      {
        extensions: ["css"],
        name: "static/css/[name].[hash:8].[ext]",
      },
    ],
  ],
});

require("./app");
