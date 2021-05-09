import _ from 'lodash';
import cx from 'classnames';
import React from 'react';
import Box, { EnhancerProps } from 'ui-box';
import styled from 'styled-components';

import { Appearance, useAppearance } from '../../application';
import { Color } from '../../application/appearance';
import Icon, { IconName } from '../icon'

import ButtonToolbar from './ButtonToolbar';

/*
 * Button
 */

interface StyledProps {
    $appearance: Appearance;
    $buttonColor: Color;
}

const Styled = styled(Box)<StyledProps>`
    font-weight: ${props => props.$appearance.typography.weights.normal};
    padding: ${props => props.$appearance.spacing.x2};
    transition: background-color 0.5s, color 0.5s;
    cursor: pointer;
    text-decoration: none;

    &.uik--button-default {
        background-color: ${props => props.$buttonColor.x050};
        color: ${props => props.$buttonColor.x700};
        border: none;
    }

    &.uik--button-default:hover {
        background-color: ${props => props.$buttonColor.x000};
        color: ${props => props.$buttonColor.x900};
    }

    &.uik--button-outline {
        background: none;
        color: ${props => props.$buttonColor.x050};
        border: 2px solid ${props => props.$buttonColor.x050};
    }

    &.uik--button-outline:hover {
        background-color: ${props => props.$buttonColor.x800};
        color: ${props => props.$buttonColor.x000};
        border-color: ${props => props.$buttonColor.x000};
    }

    &.uik--button-transparent {
        background: none;
        border: none;
        color: ${props => props.$appearance.colors.base.x600};
    }

    &.uik--button-transparent:hover {
        color: ${props => props.$appearance.colors.base.x900};
        background: ${props => props.$appearance.colors.base.x200};
    }
`;

export interface ButtonProps extends EnhancerProps {
    children?: React.ReactNode;
    buttonColor?: Color;
    appearance?: "default" | "outline" | "transparent";

    is?: React.ElementType<any>;
    href?: string,
    target?: string,
    to?: string,

    onClick?: () => void;
}

export function Button(props: ButtonProps) {
    const appearance: Appearance = useAppearance();
    const buttonColor = props.buttonColor || appearance.colors.info;
    const buttonAppearance = props.appearance || 'default';
    const onClick = props.onClick || (() => {});
    const remainingProps = _.omit(props, 'children', 'buttonColor', 'appearance', 'primary', 'onClick', 'is');

    const classNames = cx({
        'uik--button': true,
        [`uik--button-${buttonAppearance}`]: true
    })

    return <Styled 
        className={ classNames } 
        is={ props.is || 'button' }
        $appearance={ appearance } 
        $buttonColor={ buttonColor } 
        onClick={ onClick }
        { ...remainingProps }>

        { props.children }
    </Styled>
};

export type IconButtonProps = ButtonProps & { 
    icon: IconName, 
    orientation?: 'left' | 'right' 
};

export function IconButton({ icon, orientation, children, ...props}: IconButtonProps) {
    const appearance = useAppearance();
    orientation = orientation || 'left';

    if (!children) {
        return <Button { ...props }>
            <Box display="flex" alignItems="center">
                <Icon icon={ icon } />
            </Box>
        </Button>;
    } else if (orientation === 'left') {
        return <Button { ...props }>
            <Box display="flex" alignItems="center">
                <Icon icon={ icon } /><Box display="inline-block" marginLeft={ appearance.spacing.x2 }>{ children }</Box>
            </Box>
        </Button>;
    } else {
        return <Button { ...props }>
            <Box display="flex" alignItems="center">
            <Box display="inline-block" marginRight={ appearance.spacing.x2 }>{ children }</Box><Icon icon={ icon } />
            </Box>
        </Button>;
    }
};

Button.IconButton = IconButton;
Button.Toolbar = ButtonToolbar;
export default Button;