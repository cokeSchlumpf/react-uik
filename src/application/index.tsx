import React from "react";
import Box from "ui-box";
import Appearance, { AppearanceContext, Color, useAppearance } from "./appearance";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useMediaQueries, ResponsiveContext, ResponsiveProperty as RespProp, ResponsivePropertyReader, Screen, useResponsive, useResponsiveProperty } from './responsive';

export interface ApplicationProps {
    /**
     * The application's appearance object.
     */
    appearance?: Appearance;

    /**
     * Actual react elements for the app.
     */
    children?: React.ReactNode;
}

export function Application({ appearance = Appearance.apply(), children }: ApplicationProps) {
    return <>
        <GlobalStyles appearance={ appearance } />
        <Box 
            width="100%"
            minHeight="100%">

            <ResponsiveContext.Provider value={ useMediaQueries() }>
                <AppearanceContext.Provider value={ appearance }>
                    { children }
                </AppearanceContext.Provider>
            </ResponsiveContext.Provider>
        </Box>
    </>
}

export {
    Appearance,
    AppearanceContext,
    Color,
    ResponsiveContext,
    ResponsivePropertyReader,
    Screen,
    useAppearance,
    useResponsive,
    useResponsiveProperty
}

export type ResponsiveProperty<T> = RespProp<T>;

export default Application;