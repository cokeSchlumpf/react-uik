import _ from 'lodash';
import React, { useContext } from 'react';
import Box, { EnhancerProps } from 'ui-box';

import Card, { CardProps } from '../card';
import { useAppearance, useResponsiveProperty, ResponsiveProperty } from '../../application';

export interface TilesContextProps {
    columns: number,
    elevation: 0 | 1 | 2 | 3 | 4,
    insetMargin: string
}

export const TilesContext = React.createContext<TilesContextProps>({  columns: 16, elevation: 2, insetMargin: "0px" })

export interface TileProps {
    /**
     * The content of the tile.
     */
    children?: React.ReactNode,

    /**
     * If `true`, the content will be padded.
     */
    inset?: boolean,

    /**
     * The span of the column. If a single value is provided this is equal to `{ md: value }`.
     */
    span?: ResponsiveProperty<number> | number;

    /**
     * Additional props for the card which is used to display the tile.
     */
    cardProps?: CardProps;
}

export function Tile({ children, inset = true, span = 1, cardProps = {}}: TileProps) {
    const tilesContext: TilesContextProps = useContext(TilesContext);
    const spanValue: number = useResponsiveProperty(span).get(16, { md: 1 });
    const widthPct = (spanValue * (100 / tilesContext.columns)) + "%"

    const additionalProps: EnhancerProps = _.assign(
        {
            display: "inline-block",
            width: `calc(${widthPct} - 2 * ${tilesContext.insetMargin})`,
            margin: tilesContext.insetMargin,
            padding: (inset && tilesContext.insetMargin) || 0
        }, 
        _.get(cardProps, 'additionalProps') || {});

    const remainingCardProps = _.omit(cardProps, 'additionalProps');
        
    return <Card
        additionalProps={ additionalProps }
        elevation={ tilesContext.elevation }
        { ...remainingCardProps }>

        { children }
    </Card>;
}

export interface TilesProps {
    /**
     * The content of the column.
     */
    children?: React.ReactNode,

    /**
     * The number of columns the tile grid should have.
     */
    columns?: number,

    /**
     * The elevation of the tile cards.
     */
    elevation?: 0 | 1 | 2 | 3 | 4,

    /**
     * The margin of the inset for the tiles.
     */
    insetMargin?: string

    /**
     * Additional CSS properties.
     */
     additionalProps?: EnhancerProps
}

export function Tiles(props: TilesProps) {
    const appearance = useAppearance();

    const columns = props.columns || 16;
    const elevation = props.elevation || 1;
    const insetMargin = props.insetMargin || appearance.spacing.x1;
    const remainingProps = props.additionalProps;

    return <Box 
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="stretch"
        { ...remainingProps }>
            
        <TilesContext.Provider value={{ columns, elevation, insetMargin }}>
            { props.children }
        </TilesContext.Provider>
    </Box>
}

Tiles.Tile = Tile;
export default Tiles;