import { createGlobalStyle } from 'styled-components';
import Appearance from '../appearance';

import css from './globals.css';

interface StylesProps {
    $appearance: Appearance;
}

const Styles = createGlobalStyle<StylesProps>`
    ${props => props.$appearance.typography.cssImport && props.$appearance.typography.cssImport}

    ${css}

    body {
        font: ${props => props.$appearance.typography.font};
        font-weight: ${props => props.$appearance.typography.weights.normal};
        color: ${props => props.$appearance.colors.base.x900};
        background-color: ${props => props.$appearance.colors.base.x000};

        &.ReactModal__Body--open {
            overflow: hidden;
            &.hide-intercom #intercom-container {
                display: none;
            }
        }

        .ReactModalPortal > div {
            opacity: 0;
        }

        .ReactModalPortal .ReactModal__Overlay {
            transition: all 200ms ease-in;

            &--after-open {
                opacity: 1;
            }

            &--before-close {
                opacity: 0;
            }
        }
    }`;

export interface GlobalStylesProps {
    appearance: Appearance;
}

export function GlobalStyles({ appearance }: GlobalStylesProps) {
    return <Styles $appearance={ appearance } />
}
