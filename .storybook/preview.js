import { storyDecorator } from "../src/decorators";
import "../src/index.css";

export const decorators = [storyDecorator];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
