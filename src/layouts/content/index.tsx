import React from 'react';
import Box, { EnhancerProps } from 'ui-box'
import styled from 'styled-components';

import { useAppearance, Appearance } from '../../application'

interface StyledBoxProps {
    $appearance: Appearance
}

const StyledBox = styled(Box)<StyledBoxProps>`
    h1 { margin-bottom: ${props => props.$appearance.spacing.x6} }
    h2 { margin-bottom: ${props => props.$appearance.spacing.x4} }
    h3 { margin-bottom: ${props => props.$appearance.spacing.x3} }
    h4 { margin-bottom: ${props => props.$appearance.spacing.x2} }
    h5 { margin-bottom: ${props => props.$appearance.spacing.x2} }
    h6 { margin-bottom: calc(${props => props.$appearance.spacing.x1} / 2) }

    p,
    .uik--content-block { 
        margin-bottom: ${props => props.$appearance.spacing.x3} 
    }

    .uik--content-block:last-child,
    p:last-child {
        margin-bottom: 0;
    }
`;


export interface ContentOwnProps {
    children: React.ReactNode
}

export type ContentProps = ContentOwnProps & EnhancerProps;

function Content({ children, ...props }: ContentProps) {
    const appearance = useAppearance();

    return <StyledBox $appearance={ appearance } { ...props }>
        { children }
    </StyledBox>
}

export default Content;

