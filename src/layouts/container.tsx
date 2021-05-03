import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { useAppearance } from '../application'

interface ContainerProps extends EnhancerProps {
    children?: React.ReactNode
}

export function Container(props: ContainerProps) {
    const appearance = useAppearance();
    const marginX = (props.width && "auto") || props.marginX || appearance.spacing.x2;

    return <Box marginX={ marginX } { ...props }>
        { props.children }
    </Box>
}

export default Container;