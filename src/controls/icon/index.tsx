import styled from 'styled-components';
import { icons } from './icons';
import _ from 'lodash';
import { Tiles } from '../../layouts';

interface SvgProps {
    $block: boolean;
}

const Svg = styled.svg<SvgProps>`
  display: ${props => (props.$block ? 'block' : 'inline-block')};
  vertical-align: middle;

  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;

const Path = styled.path`
  fill: currentColor;
`;

export type IconName = keyof typeof icons;

export interface IconProps {
    block?: boolean;
    icon: keyof typeof icons;

    width?: string;
    height?: string;
}

export function Icon({ icon, block = false, width = '2rem', height = '2rem' }: IconProps) {
    return (
        <Svg viewBox="0 0 1024 1024" style={{ width: "2rem", height: "2rem" }} $block={block}>
            <Path d={icons[icon]} />
        </Svg>
    );
}

export function Palette() {
    return <Tiles columns={ 8 }>
        {
            _.map(_.sortBy(_.keys(icons)), icon => <Tiles.Tile key={ icon } cardProps={{ additionalProps: { textAlign: 'center' } }}>
                <Icon icon={ icon as keyof typeof icons } block={ false } /> <br />
                { icon }
            </Tiles.Tile>)
        }
    </Tiles>;
}

Icon.Palette = Palette;
export default Icon;
