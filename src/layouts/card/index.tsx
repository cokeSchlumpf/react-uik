import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { useAppearance, Color } from '../../application';

export function Title({ children }: { children: React.ReactNode }) {
    const appearance = useAppearance();

    return <Box 
        padding={ appearance.spacing.x2 }
        
        fontWeight={ appearance.typography.weights.medium }>
        { children }
    </Box>
}

export function Content({ children }: { children: React.ReactNode }) {
    const appearance = useAppearance();

    return <Box 
        padding={ appearance.spacing.x2 }>

        { children }
    </Box>
}

export interface CardProps {
    /**
     * The card content.
     */
    children?: React.ReactNode;

    /**
     * The color of the card.
     */
    color?: Color;

    /**
     * The color of the elevation shadow.
     */
    elevationColor?: Color;

    /**
     * The strength of the elevation shadow.
     */
    elevation?: 0 | 1 | 2 | 3 | 4;

    /**
     * Additional CSS properties.
     */
    additionalProps?: EnhancerProps;
}

export function Card({ children, color, elevationColor, elevation = 1, additionalProps }: CardProps) {
    const appearance = useAppearance();

    const colorValue = color || appearance.colors.base;
    elevationColor = elevationColor || colorValue;

    const boxShadow = {
        0: `${elevationColor.x500} 0px 0px 1px`,
        1: `${elevationColor.x400} 0px 0px 1px, ${elevationColor.x500} 0px 2px 4px -2px`,
        2: `${elevationColor.x400} 0px 0px 1px, ${elevationColor.x500} 0px 5px 8px -4px`,
        3: `${elevationColor.x400} 0px 0px 1px, ${elevationColor.x500} 0px 8px 10px -4px`,
        4: `${elevationColor.x400} 0px 0px 1px, ${elevationColor.x500} 0px 16px 24px -8px`
    }

    return <Box
        boxShadow={ boxShadow[elevation] }
        borderRadius={ appearance.borders.radiusX1 }
        backgroundColor={ colorValue.x000 }
        color={ colorValue.x900 }
        overflowX="hidden"
        { ...additionalProps }>

        { children }
    </Box>
}

Card.Content = Content;
Card.Title = Title;
export default Card;