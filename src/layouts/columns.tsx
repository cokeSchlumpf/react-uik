import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { useAppearance, useResponsiveProperty, ResponsiveProperty } from '../application';

export interface Size {
    flexGrow?: number,
    minWidth?: string,
    maxWidth?: string,
    width?: string
}

interface ColProps {
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
      * Additional CSS properties attached to the Grid.
      */
     additionalProps?: EnhancerProps
}

export function Col({ children, size, inset = true, additionalProps = {}}: ColProps) {
    const appearance = useAppearance();
    const sizeValue: Size = useResponsiveProperty(size).get({});

    return <Box 
        minWidth={ sizeValue.minWidth }
        maxWidth={ sizeValue.maxWidth }
        width={ sizeValue.width }
        flexGrow={ sizeValue.flexGrow || (!sizeValue.minWidth && !sizeValue.width && 1) }
        { ...additionalProps }>

        { 
            inset && <>
                <Box margin={ appearance.spacing.x2 }>
                    { children }
                </Box>
            </>
        }

        {
            !inset && <>
                { children }
            </>
        }
    </Box>
}

export interface ColumnsProps {
    /**
     * The columns.
     */
    children?: React.ReactNode,

    /**
    * Additional CSS properties attached to the Grid.
    */
    additionalProps?: EnhancerProps
}

export function Columns({ children, additionalProps }: ColumnsProps) {
    return <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        { ...additionalProps }>

        { children }
    </Box>
}

Columns.Col = Col;
export default Columns;