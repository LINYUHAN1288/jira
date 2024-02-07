/**
 * @file backdrop loader 背景蒙层加载
 * @author linyuhan
 */

import { Backdrop, CircularProgress } from '@mui/material';

export const BackdropLoader = ({ open }: { open: boolean }) => {
    return (
        <div>
            <Backdrop open={open} sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};
