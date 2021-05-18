import React from 'react';
import Box, { EnhancerProps } from 'ui-box';
import styled from 'styled-components';

import { Appearance, useAppearance } from '../../application';

interface StyledProps {
    $appearance: Appearance;
};

const Styled = styled(Box)<StyledProps>`
    display: flex;

    .uik--button {
        margin-right: ${props => props.$appearance.spacing.x1};
    }

    .uik--button:last-child {
        margin-right: 0;
    }
`;

export interface ToolbarProps extends EnhancerProps {
    /**
     * The elements of the toolbar, usually buttons.
     */
    children?: React.ReactNode
};

export function ButtonToolbar({ children, ...props }: ToolbarProps) {
    const appearance = useAppearance();

    return <Styled 
        $appearance={ appearance } 
        className="uik--content-block" 
        { ...props }>
        
        { children }
    </Styled>;
}

export default ButtonToolbar;