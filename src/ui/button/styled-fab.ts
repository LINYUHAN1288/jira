/**
 * @file Fab - Floating Action Button
 * @author linyuhan
 */

import { Palette, PaletteColor, styled } from '@mui/material/styles';
import { Fab } from '@mui/material';

type PaletteKey = keyof Palette;

export const StyledFab = styled(Fab)(({ theme, color = 'primary' }) => ({
    color: 'white',
    backgroundColor: (theme.palette[color as PaletteKey] as PaletteColor).main,
    '&:hover': {
        backgroundColor: (theme.palette[color as PaletteKey] as PaletteColor).main,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .1) 0 0)`
    }
}));