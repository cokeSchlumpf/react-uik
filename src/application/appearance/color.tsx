import _ from 'lodash';
import Box, { EnhancerProps } from 'ui-box';

export interface ColorBoxProps extends EnhancerProps {
    /**
     * The color which should be displayed in the box.
     */
    c: string
};

/**
 * Simple helper component to display color palettes.
 */
export function ColorBox({ c, ...props }: ColorBoxProps) {
    return <Box 
        backgroundColor={c} 
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...props}>

        <Box color={ Color.hexInvert(c) }>
            { c }
        </Box>
    </Box>;
};

export interface ColorPaletteProps extends EnhancerProps {
    /**
     * The color which should be displayed in the palette.
     */
    c: Color
};

/**
 * Simple helper component to display color palettes.
 */
export function ColorPalette({ c, ...props }: ColorPaletteProps) {
    return <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="stretch"
        backgroundColor="#ccc"
        padding="10px"
        height="100px">

        <ColorBox flexGrow={1} c={ c.x000 } />
        <ColorBox flexGrow={1} c={ c.x050 } />
        <ColorBox flexGrow={1} c={ c.x100 } />
        <ColorBox flexGrow={1} c={ c.x200 } />
        <ColorBox flexGrow={1} c={ c.x300 } />
        <ColorBox flexGrow={1} c={ c.x400 } />
        <ColorBox flexGrow={1} c={ c.x500 } />
        <ColorBox flexGrow={1} c={ c.x600 } />
        <ColorBox flexGrow={1} c={ c.x700 } />
        <ColorBox flexGrow={1} c={ c.x800 } />
        <ColorBox flexGrow={1} c={ c.x900 } />
    </Box>
}

/**
 * A color is always defined as a scale of colors. Usually starting with the base color at `x000`. 
 * The following shades encode lighter/ darker versions of the color converging to the base color of the theme at `x900`.
 */
export class Color {
    x000: string;
    x050: string;
    x100: string;
    x200: string;
    x300: string;
    x400: string;
    x500: string;
    x600: string;
    x700: string;
    x800: string;
    x900: string;

    /**
     * See docs of Color for details.
     * 
     * @param x000 A shade of the color.
     * @param x050 A shade of the color.
     * @param x100 A shade of the color.
     * @param x200 A shade of the color.
     * @param x300 A shade of the color.
     * @param x400 A shade of the color.
     * @param x500 A shade of the color.
     * @param x600 A shade of the color.
     * @param x700 A shade of the color.
     * @param x800 A shade of the color.
     * @param x900 A shade of the color.
     */
    constructor(x000: string, x050: string, x100: string, x200: string, x300: string, x400: string, x500: string, x600: string, x700: string, x800: string, x900: string) {
        this.x000 = x000;
        this.x050 = x050;
        this.x100 = x100;
        this.x200 = x200;
        this.x300 = x300;
        this.x400 = x400;
        this.x500 = x500;
        this.x600 = x600;
        this.x700 = x700;
        this.x800 = x800;
        this.x900 = x900;
    }

    static fromHex(color: string, base: string = '#fffff'): Color {
        return new Color(
            color,
            Color.hexOpacity(color, 0.9, base),
            Color.hexOpacity(color, 0.8, base),
            Color.hexOpacity(color, 0.7, base),
            Color.hexOpacity(color, 0.6, base),
            Color.hexOpacity(color, 0.5, base),
            Color.hexOpacity(color, 0.4, base),
            Color.hexOpacity(color, 0.3, base),
            Color.hexOpacity(color, 0.2, base),
            Color.hexOpacity(color, 0.1, base),
            base
        );
    }

    static defaults = {
        light: new Color('#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151', '#1F2937', '#111827'),
        dark: new Color('#000000', '#111827', '#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB', '#F3F4F6', '#F9FAFB'),

        blue: Color.fromHex('#24339D', '#FFFFFF'),
        green: Color.fromHex('#60BA03', '#FFFFFF'),
        lightblue: Color.fromHex('#4A97E2', '#FFFFFF'),
        purple: Color.fromHex('#4E0078', '#FFFFFF'),
        red: Color.fromHex('#FF0208', '#FFFFFF'),
        yellow: Color.fromHex('#FFBE00', '#FFFFFF')
    }

    static rgbOpacity(fg: number[], o: number, bg: number[] = [255, 255, 255]): number[] {
        return fg.map((colFg, idx) => _.round(o * colFg + (1 - o) * bg[idx]));
    }

    static rgbToHex(r: number, g: number, b: number): string {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    static rgbToHexFromArray(rgb: number[]): string {
        return Color.rgbToHex(rgb[0], rgb[1], rgb[2]);
    }

    static hexInvert(hex: string): string {
        const padZero = (str: string, len?: number) => {
            len = len || 2;
            var zeros = new Array(len).join('0');
            return (zeros + str).slice(-len);
        }

        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        
        return '#' + padZero(r) + padZero(g) + padZero(b);
    }

    static hexOpacity(fg: string, o: number, bg: string): string {
        const rgb = Color.rgbOpacity(Color.hexToRgb(fg), o, Color.hexToRgb(bg));
        return Color.rgbToHexFromArray(rgb);
    }

    static hexToRgb(hex: string): number[] {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
    }

};

export default Color;