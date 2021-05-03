import React, { useContext } from 'react';

import Borders from "./borders";
import Color from "./color";
import Colors from "./colors";
import Spacing from "./spacing";
import { Typography } from "./typography";

/**
 * Appearance defines common styles used by components of the application.
 */
export class Appearance {
    borders: Borders;
    colors: Colors;
    spacing: Spacing;
    typography: Typography;

    constructor(borders: Borders, colors: Colors, spacing: Spacing, typography: Typography) {
        this.borders = borders;
        this.colors = colors;
        this.spacing = spacing;
        this.typography = typography;
    }

    static apply(): Appearance {
        return new Appearance(Borders.apply(), Colors.apply(), Spacing.apply(), Typography.apply());
    }
};

export const AppearanceContext = React.createContext(Appearance.apply());

export function useAppearance(): Appearance {
    return useContext(AppearanceContext);
}

export default Appearance;

export {
    Color
}