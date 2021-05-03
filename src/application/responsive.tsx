import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * Helper class to store information about the current screen size.
 */
export class Screen {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    xxl: boolean;

    constructor(xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean, xxl: boolean) {
        this.xs = xs;
        this.sm = sm;
        this.md = md;
        this.lg = lg;
        this.xl = xl;
        this.xxl = xxl;
    }
}

/**
 * Wrapper type for responsive properties.
 */
export interface ResponsiveProperty<T> {

    xs?: T
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    xxl?: T;

}

/**
 * Helper class to read a responsive property.
 */
export class ResponsivePropertyReader<T> {

    property: ResponsiveProperty<T>;

    screen: Screen;

    constructor(property: ResponsiveProperty<T>, screen: Screen) {
        this.property = property;
        this.screen = screen;
    }

    static apply<T>(property: ResponsiveProperty<T> | T | undefined, screen: Screen): ResponsivePropertyReader<T> {
        let p: ResponsiveProperty<T>;

        if (property && typeof property === 'object' && ('xs' in property || 'sm' in property || 'md' in property || 'lg' in property || 'xl' in property || 'xxl' in property)) {
            p = property;
        } else {
            p = { md: property as T }
        }

        return new ResponsivePropertyReader(p, screen);
    }

    get(defaultValue: T, additionalDefaults?: ResponsiveProperty<T>): T {
        const xs = this.property.xs || additionalDefaults?.xs || defaultValue;
        const sm = this.property.sm || additionalDefaults?.sm || xs;
        const md = this.property.md || additionalDefaults?.md || sm;
        const lg = this.property.lg || additionalDefaults?.lg || md;
        const xl = this.property.xl || additionalDefaults?.xl || lg;
        const xxl = this.property.xxl || additionalDefaults?.xxl || xl;

        if (this.screen.xxl) {
            return xxl;
        } else if (this.screen.xl) {
            return xl;
        } else if (this.screen.md) {
            return md;
        } else if (this.screen.sm) {
            return sm;
        } else {
            return xs;
        }
    }

}

/**
 * Screen properties will be derived based on CSS media queries.
 * 
 * @returns 
 */
export function useMediaQueries(): Screen {
    const xs = true;
    const sm = useMediaQuery({ query: '(min-width: 576px)' })
    const md = useMediaQuery({ query: '(min-width: 768px)' })
    const lg = useMediaQuery({ query: '(min-width: 992px)' })
    const xl = useMediaQuery({ query: '(min-width: 1200px)' })
    const xxl = useMediaQuery({ query: '(min-width: 1400px)' })

    return new Screen(xs, sm, md, lg, xl, xxl);
}

/**
 * Simple hook to fetch current screen properties to create responsive behaviors.
 */
export function useResponsive(): Screen {
    return useContext(ResponsiveContext);
}

export function useResponsiveProperty<T>(property: ResponsiveProperty<T> | T | undefined): ResponsivePropertyReader<T>  {
    const screen = useResponsive();
    return ResponsivePropertyReader.apply(property, screen);
}

export const ResponsiveContext = React.createContext(new Screen(true, true, true, true, true, true));
export default ResponsiveContext;