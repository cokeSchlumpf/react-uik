import cx from 'classnames';
import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import styled from 'styled-components';
import { Appearance, useAppearance } from '../../application'
import { Color } from '../../application/appearance'

/*
 * Menu Item
 */
export interface ItemProps extends EnhancerProps {
    children: React.ReactNode,
    active?: boolean
}

export function Item({ children, active, ...props }: ItemProps) {
    const classNames = cx({
        'mq--vmenu-item': true,
        'mq--vmenu-active': active
    });

    return <Box is="li" className={ classNames } { ...props }>
        { children }
    </Box>;
}

/*
 * Menu
 */ 
interface MenuStyledProps {
    $appearance: Appearance;
    $menuColor: Color;
}

const MenuStyled = styled(Box)<MenuStyledProps>`
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    li.mq--vmenu-item {
        display: block;
        text-align: left;
    }

    li.mq--vmenu-item a {
        display: block;
        padding: 0 calc(${props => props.$appearance.spacing.x4 } * 4) 0 ${props => props.$appearance.spacing.x4 };
        line-height: 6rem;
        text-decoration: none;
    }

    &.mq--vmenu-container .mq--vmenu-item a {
        background: ${props => props.$appearance.colors.base.x300};
        border-top: 1px solid ${props => props.$appearance.colors.base.x400};
        border-left: 4px solid ${props => props.$appearance.colors.base.x300};
        color: ${props => props.$appearance.colors.base.x700};
        transition: background-color 0.5s, color 0.5s;
    }

    &.mq--vmenu-container .mq--vmenu-item:first-child a {
        border-top: none;
    }

    &.mq--vmenu-container .mq--vmenu-item a:hover {
        background: ${props => props.$appearance.colors.base.x200};
    }

    &.mq--vmenu-container .mq--vmenu-item.mq--vmenu-active a {
        color: ${props => props.$appearance.colors.base.x800};
        font-weight: ${props => props.$appearance.typography.weights.medium};
        background: ${props => props.$appearance.colors.base.x050};
        border-left: 4px solid ${props => props.$menuColor.x000};
        border-top: none;
    }

    &.mq--vmenu-container .mq--vmenu-item.mq--vmenu-active + .mq--vmenu-item a {
        border-top: none;
    }

    &.mq--vmenu-default {
        border-right: 4px solid ${props => props.$appearance.colors.base.x300};
    }

    &.mq--vmenu-default .mq--vmenu-item a {
        color: ${props => props.$appearance.colors.base.x700};
        border-right: 4px solid ${props => props.$appearance.colors.base.x300};
        margin-right: -4px;

        transition: background-color 0.5s, border-bottom 0.5s;
    }

    &.mq--vmenu-default .mq--vmenu-item a:hover {
        background: ${props => props.$appearance.colors.base.x200};
        border-right: 4px solid ${props => props.$menuColor.x600};
    }

    &.mq--vmenu-default .mq--vmenu-item.mq--vmenu-active a {
        background: ${props => props.$appearance.colors.base.x000};
        color: ${props => props.$appearance.colors.base.x800};
        font-weight: ${props => props.$appearance.typography.weights.medium};
        border-right: 4px solid ${props => props.$menuColor.x000};
    }
`;

export interface MenuOwnProps {
    children?: React.ReactNode;
    menuColor?: Color;
    appearance?: 'default' | 'container';
}

export type MenuProps = MenuOwnProps & EnhancerProps;

export function Menu({ children, menuColor, appearance: menuAppearance, ...props }: MenuProps) {
    const appearance: Appearance = useAppearance();
    menuColor = menuColor || appearance.colors.primary;
    menuAppearance = menuAppearance || 'default';


    const classNames = cx({
        'mq--vmenu': true,
        [`mq--vmenu-${menuAppearance}`]: true
    })

    return <MenuStyled is="ul" className={ classNames } $appearance={ appearance } $menuColor={ menuColor } { ...props }>
        { children }
    </MenuStyled>;
}

Menu.Item = Item;
export default Menu;