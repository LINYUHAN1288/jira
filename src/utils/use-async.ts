/**
 * @file use-async.ts
 * @author linyuhan
 */

import { useState, useReducer, useCallback } from 'react';
import { useMountedRef } from 'utils';

interface State<D> {
    error: Error | null;
    data: D | null;
    status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
    status: 'idle',
    data: null,
    error: null
};

const defaultConfig = {
    throwOnError: false
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef();
    return useCallback(
        (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
        [dispatch, mountedRef]
    );
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    // useState<T>, T 泛型代表变量类型, 如下为 State<D>
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
        {
            ...defaultInitialState,
            ...initialState
        }
    );

    const safeDispatch = useSafeDispatch(dispatch);
    // 直接传入函数是惰性初始化
    const [retry, setRetry] = useState(() => () => {});

    const setData = useCallback((data: D) =>
        safeDispatch({
            data,
            status: 'success',
            error: null
        }), [safeDispatch]
    );

    const setError = useCallback((error: Error) =>
        safeDispatch({
            error,
            status: 'error',
            data: null
        }), [safeDispatch]
    );

    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                // throw 打断一切进程
                throw new Error('请传入 Promise 类型数据');
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            safeDispatch({ status: 'loading' });
            return promise
                .then((data) => {
                    setData(data);
                    return data;
                })
                .catch((error) => {
                    setError(error);
                    if (config.throwOnError) {
                        return Promise.reject(error);
                    }
                    return error;
                });
        },
        [config.throwOnError, setData, setError, safeDispatch]
    );

    return {
        isIdle: state.status === 'idle',
        isLoading: state.status === 'loading',
        isError: state.status === 'error',
        isSuccess: state.status === 'success',
        run,
        setData,
        setError,
        retry,
        ...state
    };
};
