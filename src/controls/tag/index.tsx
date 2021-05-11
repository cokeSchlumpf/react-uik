import React, { useContext } from 'react';
import Box, { EnhancerProps } from "ui-box";

import { useAppearance } from '../../application'
import { Color, Colors } from "../../application/appearance";

const TagColorContext = React.createContext(Colors.apply().info);

export function Label({ children, ...props }: { children: React.ReactNode } & EnhancerProps) {
    const appearance = useAppearance();
    const tagColor: Color = useContext(TagColorContext);

    return <Box 
        is="span" 
        display="inline-block" 
        backgroundColor={ tagColor.x500 }
        color={ tagColor.x000 }
        marginBottom={ `-${appearance.spacing.x1}` }
        marginTop={ `-${appearance.spacing.x1}` }
        marginLeft={ `-${appearance.spacing.x1}` }
        marginRight={ `${appearance.spacing.x1}` }
        padding={ appearance.spacing.x1 }
        borderTopLeftRadius="1.4rem"
        borderBottomLeftRadius="1.4rem"
        { ...props }>

        { children }
    </Box>
}

export function Tags({ children, ...props }: { children: React.ReactNode } & EnhancerProps) {
    return <Box { ...props }>{ children }</Box>;
}

export interface TagProps {
    tagColor?: Color,
    children: React.ReactNode
}

export function Tag({ tagColor, children, ...props }: TagProps & EnhancerProps) {
    const appearance = useAppearance();

    tagColor = tagColor || appearance.colors.neutral;

    return <Box 
        is="span"
        backgroundColor={ tagColor.x600 }
        color={ tagColor.x000 }
        borderRadius="1.4rem"
        padding={ appearance.spacing.x1 }
        fontSize="1.2rem"
        display="inline-block"
        marginRight={ appearance.spacing.x1 }
        { ...props }>

        <TagColorContext.Provider value={ tagColor }>
            { children }
        </TagColorContext.Provider>
    </Box>
}

export interface ToggleProps extends TagProps {
    active?: boolean,
    onSelect?: (active: boolean) => void
}

export function Toggle({ active, tagColor, onSelect = () => {}, ...props}: ToggleProps & EnhancerProps) {
    const theme = useAppearance();
    console.log(active);

    return <a href="#select" onClick={ e => { e.preventDefault(); onSelect(!active) } }>
        {
            active ? <>
                <Tag color={ theme.colors.base.x800 } tagColor={ tagColor } { ...props } />
            </> : <>
                <Tag color={ theme.colors.base.x800 } tagColor={ theme.colors.neutral } { ...props } />
            </>
        }
    </a>;
}

Tag.Label = Label;
Tag.Tags = Tags;
Tag.Toggle = Toggle;
export default Tag;