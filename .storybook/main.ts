const path = require("path");
module.exports = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-actions", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@types": path.resolve(__dirname, "../src/types/index.ts"),
    };
    return config;
  },
};
