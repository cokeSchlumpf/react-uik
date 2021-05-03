import React from 'react';

import Application from '../src/application';

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <>
      <Application>
        <Story />
      </Application>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}