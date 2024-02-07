/**
 * @file confirm dialog
 * @author <NAME>
 */

import { createPortal } from 'react-dom';
import useConfirm from 'hooks/useConfirm';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmDialog = () => {
    const { onConfirm, onCancel, confirmState } = useConfirm();

    const portalElement = document.getElementById('portal');
    const component = confirmState.show ? (
        <Dialog fullWidth maxWidth="xs" open={confirmState.show} onClose={onCancel}>
            <DialogTitle sx={{ fontSize: '1rem' }}>{confirmState.title}</DialogTitle>
            <DialogContent>
                <span>{confirmState.description}</span>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{confirmState.cancelButtonName}</Button>
                <Button onClick={onConfirm}>{confirmState.confirmButtonName}</Button>
            </DialogActions>
        </Dialog>
    ) : null;

    return createPortal(component, portalElement as Element);
};

export default ConfirmDialog;
