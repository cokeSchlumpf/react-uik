import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { HorizontalMenu } from '../horizontal';
import { Columns, Container } from '../../layouts'

import { Appearance, useAppearance } from '../../application'


/*
 * Brand
 */

export interface BrandProps {
    /**
     * The name of the brand.
     */
    brand: string

    /**
     * Optional name of the product.
     */
    product?: string
}

export function Brand({ brand, product }: BrandProps) {
    const appearance: Appearance = useAppearance();

    return <Box
        fontWeight={ appearance.typography.weights.medium }>

        { brand }
        { product && <Box is="span" fontWeight={ appearance.typography.weights.normal }> { product }</Box> }
    </Box>
}

/*
 *  NavBar Menu 
 */

export interface NavBarMenuProps {
    children?: React.ReactNode
}

export function NavBarMenu({ children }: NavBarMenuProps) {
    const appearance: Appearance = useAppearance();

    return <HorizontalMenu color={ appearance.colors.primary }>
        { children }
    </HorizontalMenu>;
}

NavBarMenu.Item = HorizontalMenu.Item;
NavBarMenu.Divider = HorizontalMenu.Divider;

/* 
 * NavBar
 */ 

interface NavBarOwnProps {
    mainMenu?: React.ReactNode,
    appMenu?: React.ReactNode

    contentProps?: EnhancerProps
}

export type NavBarProps = NavBarOwnProps & EnhancerProps;

export function NavBar({ mainMenu, appMenu, contentProps = {}, ...props }: NavBarProps) {
    const appearance: Appearance = useAppearance();

    return <Box
        color={ appearance.colors.primary.x900 }
        backgroundColor={ appearance.colors.primary.x000 }
        { ...props }>
        
        <Container marginX={ 0 } { ...contentProps }>
            <Columns additionalProps={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <Columns.Col inset={ false } additionalProps={{ flexGrow: 1 }}>
                    {
                        mainMenu && mainMenu
                    }
                </Columns.Col>
                <Columns.Col inset={ false }>
                    {
                        appMenu && appMenu
                    }
                </Columns.Col>
            </Columns>
        </Container>
    </Box>
}

NavBar.Brand = Brand;
NavBar.Menu = NavBarMenu;
export default NavBar;
