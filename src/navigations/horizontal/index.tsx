import cx from 'classnames';
import React from 'react';

import styled from 'styled-components';
import { Appearance, useAppearance } from '../../application'
import { Color } from '../../application/appearance'

interface MenuProps {
    appearance: Appearance,
    buttonColor: Color
}

const Menu = styled.ul<MenuProps>`
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    background-color: ${props => props.buttonColor.x000};

    li.mq--item {
        display: inline-block;
    }

    li.mq--item a {
        display: inline-block;
        padding: 0 ${props => props.appearance.spacing.x4};
        line-height: 6rem;
        text-decoration: none;
        background-color: ${props => props.buttonColor.x000};
        color: ${props => props.buttonColor.x700};
        transition: background-color 0.5s, color 0.5s;
    }

    li.mq--item a:hover {
        color: ${props => props.buttonColor.x900};
        background-color: ${props => props.buttonColor.x050};
    }

    li.mq--item.mq--active a,
    li.mq--item a.active {
        color: ${props => props.buttonColor.x900};
        font-weight: ${props => props.appearance.typography.weights.medium};
    }

    li.mq--item:first-child {
        margin-left: 0;
    }

    li.mq--item-condensed {
        display: inline-block;
        margin-right: ${props => props.appearance.spacing.x4};
        padding: 0;
    }

    li.mq--item-condensed:last-child {
        margin-right: 0;
    }

    li.mq--item-condensed a {
        color: ${props => props.buttonColor.x700};
        transition: color 0.5s;
        text-decoration: none;
    }

    li.mq--item-condensed a:hover,
    li.mq--item-condensed.mq--active {
        color: ${props => props.buttonColor.x900}
    }

    li.mq--item-divider {
        border-left: 1px solid ${ props => props.buttonColor.x400 };
        min-height: 3rem;
    }

    li.mq--item-divider-condensed {
        border-left: 1px solid ${ props => props.buttonColor.x400 };
        min-height: 3rem;
        margin-right: ${props => props.appearance.spacing.x4};
    }
`;

interface MenuItemProps {
    active?: boolean,
    condensed?: boolean,
    children: React.ReactNode
}

export function HorizontalMenuItem({ children, condensed = false, active = false }: MenuItemProps) {
    const classNames = cx({
        'mq--item': !condensed,
        'mq--item-condensed': condensed,
        'mq--active': active
    });

    return <li className={ classNames }>{ children }</li>;
}

interface DividerProps {
    condensed?: boolean
}

export function Divider({ condensed = false }: DividerProps) {
    const classNames = cx({
        'mq--item-divider': !condensed,
        'mq--item-divider-condensed': condensed
    });
    return <li className={ classNames } />
}

export interface HorizontalMenuProps {
    children: React.ReactNode,
    color: Color
}

export function HorizontalMenu({ children, color }: HorizontalMenuProps) {
    const appearance: Appearance = useAppearance();

    return <Menu appearance={ appearance } buttonColor={ color }>
        { children }
    </Menu>
}

HorizontalMenu.Item = HorizontalMenuItem;
HorizontalMenu.Divider = Divider;

export default HorizontalMenu;