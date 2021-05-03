import Color from "./color";

/**
 * This class defines base color for an appearance.
 */
export class Colors {
    base: Color;
    neutral: Color;
    primary: Color;
    secondary: Color;

    danger: Color;
    success: Color;
    warning: Color;
    info: Color;

    constructor(base: Color, neutral: Color, primary: Color, secondary: Color, danger: Color, success: Color, warning: Color, info: Color) {
        this.base = base;
        this.neutral = neutral;
        this.primary = primary;
        this.secondary = secondary;
        this.danger = danger;
        this.success = success;
        this.warning = warning;
        this.info = info;
    }

    static apply(): Colors {
        return new Colors(
            Color.defaults.light, 
            Color.defaults.dark, 
            Color.defaults.blue, 
            Color.defaults.purple, 
            Color.defaults.red, 
            Color.defaults.green, 
            Color.defaults.yellow, 
            Color.defaults.blue);
    }
};

export default Colors;