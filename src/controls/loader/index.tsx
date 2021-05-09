import { Spinner } from 'evergreen-ui';
import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { useAppearance } from '../../application';

export interface LoaderProps extends EnhancerProps {
    children?: React.ReactNode,
    loading?: boolean,
    text?: string
}

export function Loader({ children, loading = false, text = 'Crunching all my numbers. Please wait.', ...props }: LoaderProps) {
    const theme = useAppearance();

    return <Box height="100%" position="relative" { ...props }>
        <Box opacity={ loading ? 0.2 : 1 } transition="opacity 1s">
            { children }
        </Box>

        { 
            loading && <>
                <Box 
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center">

                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Spinner marginBottom={ theme.spacing.x2 } />
                        Crunching all my numbers. Please wait.
                    </Box>
                </Box>
            </>
        }
    </Box>
}

export default Loader;