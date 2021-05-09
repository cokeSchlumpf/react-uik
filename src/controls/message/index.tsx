import _ from 'lodash';
import Box, { EnhancerProps } from 'ui-box';

import { useAppearance } from '../../application'
import { Button } from '../button';
import { Content } from '../../layouts';

export interface Action {
    label: string,
    action: () => void
}

interface MessageProps extends EnhancerProps {
    title?: string,
    message: string,
    kind?: 'info' | 'success' | 'warning' | 'danger';
    actions?: Array<Action>,

    onClose: () => void
}

export function Message({ title, message, actions = [], kind = "info", onClose }: MessageProps) {
    const appearance = useAppearance();
    const color = appearance.colors[kind];

    return <Box
        className="uik--content-block"
        backgroundColor={ color.x700 }
        borderLeft={ `4px solid ${color.x000}` }>

        <Box padding={ appearance.spacing.x2 } display="flex" alignItems="center">
            <Content flexGrow={ 1 }>
                { title && <h6>{ title }</h6> }
                <p>{ message }</p>
            </Content>
            <Button.Toolbar>
                {
                    _.map(actions, action => <Button key={ action.label } buttonColor={ color } appearance="outline" onClick={ action.action }>{ action.label }</Button>)
                }
                { onClose && <Button buttonColor={ color } onClick={ onClose }>Dismiss</Button> }
            </Button.Toolbar>
        </Box>
    </Box>
}

export default Message;