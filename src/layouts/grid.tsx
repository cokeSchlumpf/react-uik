import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { useAppearance, useResponsiveProperty, ResponsiveProperty } from '../application'

export type Colspan = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16;

export interface ColProps {
    /**
     * The content of the column.
     */
    children?: React.ReactNode,

    /**
     * If `true`, the content will be padded.
     */
    inset?: boolean,

    /**
     * The span of the column. If a single value is provided this is equal to `{ md: value }`.
     */
    span?: ResponsiveProperty<Colspan> | Colspan,

    /**
     * Additional CSS properties.
     */
     additionalProps?: EnhancerProps
}

/**
 * A Grid column.
 */
export function Col({ children, span = 1, inset = true, additionalProps = {} }: ColProps) {
    const appearance = useAppearance();
    const spanValue: number = useResponsiveProperty(span).get(16, { md: 1 });

    return <Box
        float="left"
        width={ (spanValue * 6.25) + "%" }
        margin={ 0 }
        padding={ 0 }
        { ...additionalProps }>

        {
            inset && <>
                <Box margin={ appearance.spacing.x2 }>{ children }</Box>
            </>
        }
        {   
            !inset && <>
                { children }
            </>
        }
    </Box>
}

export interface RowProps {
    /**
     * A row usually contains column children.
     */
    children?: React.ReactNode

    /**
     * Additional CSS properties attached to the Grid.
     */
     additionalProps?: EnhancerProps
}

/**
 * A row of a grid.
 */
export function Row({ children, additionalProps = {} }: RowProps) {
    return <Box { ...additionalProps }>
        { children }
        <Box clear="both" />
    </Box>
}

export interface GridProps {
    /**
     * Children are usuallly Grid.Row elements.
     */
    children?: React.ReactNode,

    /**
     * The width of the grid. If no width is provided, the grid will be fluid.
     */
    width?: ResponsiveProperty<string> | string,

    /**
     * Additional CSS properties attached to the Grid.
     */
    additionalProps?: EnhancerProps
}

/*
 * Lightweight 16-column based responsive grid system.
 */
export function Grid({ children, width, additionalProps = {} }: GridProps) {
    const widthValue = useResponsiveProperty(width).get('80%');

    if (!width) {
        return <Box { ...additionalProps }>
            { children }
        </Box>
    } else {
        return <Box marginX="auto" width={ widthValue } { ...additionalProps }>
            { children }
        </Box>
    }
}

Grid.Row = Row
Grid.Col = Col

export default Grid