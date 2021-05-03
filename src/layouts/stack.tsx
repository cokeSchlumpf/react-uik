import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { useAppearance, useResponsiveProperty, ResponsiveProperty } from '../application'

export interface Size {
    flexGrow?: number,
    maxHeight?: string,
    minHeight?: string,
    height?: string
}

interface RowProps {
    /**
     * The content of the row.
     */
    children?: React.ReactNode,

    /**
     * If `true`, the content will be padded.
     */
    inset?: boolean,

    /**
     * Specify the size of the compnent. If a single value is provided this is equal to `{ md: value }`.
     */
    size?: ResponsiveProperty<Size> | Size,

    /**
     * Additional CSS properties.
     */
    additionalProps?: EnhancerProps
}

export function Row({ children, size, inset = true, additionalProps = {}}: RowProps) {
    const appearance = useAppearance();
    const sizeValue: Size = useResponsiveProperty(size).get({});

    return <Box
        minHeight={sizeValue.minHeight}
        maxHeight={sizeValue.maxHeight}
        height={sizeValue.height}
        flexGrow={sizeValue.flexGrow || (!sizeValue.minHeight && !sizeValue.height && 1)}
        {...additionalProps}>

        {
            inset && <>
                <Box margin={appearance.spacing.x2}>
                    {children}
                </Box>
            </>
        }

        {
            !inset && <>
                {children}
            </>
        }
    </Box>
}

export interface StackProps {
    /**
     * The content of the row.
     */
    children?: React.ReactNode,

    /**
    * Additional CSS properties.
    */
    additionalProps?: EnhancerProps
}

export function Stack({ children, additionalProps }: StackProps) {
    return <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        {...additionalProps}>

        {children}
    </Box>
}

Stack.Row = Row;
export default Stack;