/**
 * @file useConfirm 钩子
 * @author <NAME>
 */

import { useContext } from 'react';
import ConfirmContext from 'store/context/confirm-context';
import { HIDE_CONFIRM, SHOW_CONFIRM } from 'store/actions';

let resolveCallback: (value: unknown) => void;

const useConfirm = () => {
    const [confirmState, dispatch] = useContext(ConfirmContext);

    const closeConfirm = () => {
        dispatch({
            type: HIDE_CONFIRM
        });
    };

    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };

    const confirm = (confirmPayload: string) => {
        dispatch({
            type: SHOW_CONFIRM,
            payload: confirmPayload
        });
        return new Promise((resolve) => {
            resolveCallback = resolve;
        });
    };

    return { confirm, onConfirm, onCancel, confirmState };
};

export default useConfirm;
