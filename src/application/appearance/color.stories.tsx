import { Story, Meta } from '@storybook/react';
import Box from 'ui-box';

import { Color, ColorPalette, ColorPaletteProps } from './color';

export default {
  title: 'React UIK/Colors',
  component: ColorPalette,
  argTypes: {},
} as Meta;

export const DefaultColors: Story<ColorPaletteProps> = (args) => {
    return <Box>
        <ColorPalette c={ Color.defaults.light } />
        <ColorPalette c={ Color.defaults.dark } />
        <ColorPalette c={ Color.defaults.blue } />
        <ColorPalette c={ Color.defaults.green } />
        <ColorPalette c={ Color.defaults.lightblue } />
        <ColorPalette c={ Color.defaults.purple } />
        <ColorPalette c={ Color.defaults.red } />
        <ColorPalette c={ Color.defaults.yellow } />
    </Box>;
}
