import _ from 'lodash';
import cx from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import Box, { EnhancerProps } from 'ui-box';

import styled from 'styled-components';
import { Appearance, AppearanceContext } from '../../application'
import { Color } from '../../application/appearance'

/*
 * Container
 */
export interface TabItem {
    key: string;
    tab: string | ((active: boolean) => React.ReactNode);
    content: React.ReactNode;
}

export interface TabContainerOwnProps {
    children?: React.ReactNode;
    active: string;
    tabs: Array<TabItem>;
    tabsColor?: Color;
    appearance?: 'default' | 'container';
}

export type TabContainerProps = TabContainerOwnProps & EnhancerProps;

export function TabContainer({ active: activeDefault, tabs, tabsColor, appearance: tabsAppearance, ...props }: TabContainerProps) {
    const [ active, setActive ] = useState(activeDefault);
    const content = _.get(_.find(tabs, { key: active }), 'content') || <></>;

    useEffect(() => {
        setActive(activeDefault);
    }, [ activeDefault ]);

    return <Box display="flex" flexDirection="column" { ...props }>
        <Tabs appearance={ tabsAppearance } tabsColor={ tabsColor }>
            {
                _.map(tabs, tab => <React.Fragment key={ tab.key }>{ 
                    (typeof tab.tab === 'string') ? <>
                        <Tabs.Tab active={ _.isEqual(tab.key, active) }>
                            <a href={ `#${tab.key}` } onClick={ e => {
                                e.preventDefault();
                                setActive(tab.key);
                            }} >{ tab.tab }</a>
                        </Tabs.Tab>
                    </> : <>
                        { tab.tab(_.isEqual(tab.key, active))  }
                    </>
                }</React.Fragment>)
            }
        </Tabs>

        <Box width="100%" flexGrow={ 1 }>
            { content }
        </Box>
    </Box>
}

/*
 * Tab Item
 */

export interface TabOwnProps {
    children: React.ReactNode,
    active?: boolean
}

export type TabProps = TabOwnProps & EnhancerProps;

export function Tab({ children, active, ...props }: TabProps) {
    const classNames = cx({
        'mq--tab': true,
        'mq--tab-active': active
    });

    return <Box is="li" className={ classNames } { ...props }>
        { children }
    </Box>;
}

/*
 * Tabs
 */

interface TabsStyledProps {
    $appearance: Appearance;
    $tabsColor: Color;
}

const TabsStyled = styled(Box)<TabsStyledProps>`
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;

    li.mq--tab {
        display: inline-block;
    }

    li.mq--tab a {
        display: inline-block;
        padding: 0 calc(${props => props.$appearance.spacing.x4 } * 4) 0 ${props => props.$appearance.spacing.x4 };
        line-height: 6rem;
        text-decoration: none;
    }

    &.mq--tabs-container .mq--tab a {
        background: ${props => props.$appearance.colors.base.x300};
        border-left: 1px solid ${props => props.$appearance.colors.base.x400};
        color: ${props => props.$appearance.colors.base.x700};
        transition: background-color 0.5s, color 0.5s;
    }

    &.mq--tabs-container .mq--tab:first-child a {
        border-left: none;
    }

    &.mq--tabs-container .mq--tab a:hover {
        background: ${props => props.$appearance.colors.base.x200};
    }

    &.mq--tabs-container .mq--tab.mq--tab-active a,
    &.mq--tabs-container .mq--tab a.active {
        color: ${props => props.$appearance.colors.base.x800};
        font-weight: ${props => props.$appearance.typography.weights.medium};
        background: ${props => props.$appearance.colors.base.x050};
        border-top: 4px solid ${props => props.$tabsColor.x000};
        border-left: none;
    }

    &.mq--tabs-container .mq--tab.mq--tab-active + .mq--tab a {
        border-left: none;
    }

    &.mq--tabs-default {
        border-bottom: 4px solid ${props => props.$appearance.colors.base.x300};
    }

    &.mq--tabs-default .mq--tab a {
        color: ${props => props.$appearance.colors.base.x700};
        border-bottom: 4px solid ${props => props.$appearance.colors.base.x300};
        margin-bottom: -4px;

        transition: background-color 0.5s, border-bottom 0.5s;
    }

    &.mq--tabs-default .mq--tab a:hover {
        background: ${props => props.$appearance.colors.base.x200};
        border-bottom: 4px solid ${props => props.$tabsColor.x600};
    }

    &.mq--tabs-default .mq--tab.mq--tab-active a,
    &.mq--tabs-default .mq--tab a.active {
        background: ${props => props.$appearance.colors.base.x000};
        color: ${props => props.$appearance.colors.base.x800};
        font-weight: ${props => props.$appearance.typography.weights.medium};
        border-bottom: 4px solid ${props => props.$tabsColor.x000};
    }
`;

export interface TabsOwnProps {
    children?: React.ReactNode;
    tabsColor?: Color;
    appearance?: 'default' | 'container';
}

export type TabsProps = TabsOwnProps & EnhancerProps;

export function Tabs({ children, tabsColor, appearance: tabsAppearance, ...props }: TabsProps) {
    const appearance: Appearance = useContext(AppearanceContext);
    tabsColor = tabsColor || appearance.colors.primary;
    tabsAppearance = tabsAppearance || 'default';

    const classNames = cx({
        'mq--tabs': true,
        [`mq--tabs-${tabsAppearance}`]: true
    })

    return <TabsStyled is="ul" className={ classNames } $appearance={ appearance } $tabsColor={ tabsColor } { ...props }>
        { children }
    </TabsStyled>;
}

Tabs.Tab = Tab;
Tabs.Container = TabContainer;
export default Tabs;