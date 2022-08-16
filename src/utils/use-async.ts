/**
 * @file use-async.ts
 * @author linyuhan
 */

import { useState, useCallback } from "react";

interface State<D> {
    error: Error | null;
    data: D | null;
    status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
    status: "idle",
    data: null,
    error: null
};

const defaultConfig = {
    throwOnError: false
};

export const useAsync = <D>(
    initialState?: State<D>,
    initialConfig?: typeof defaultConfig
) => {
    const config = { ...defaultConfig, ...initialConfig };
    // useState<T>, T 泛型代表变量类型, 如下为 State<D>
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });
    // 直接传入函数是惰性初始化
    const [retry, setRetry] = useState(() => () => {});

    const setData = (data: D) =>
        setState({
            data,
            status: "success",
            error: null
        });

    const setError = (error: Error) =>
        setState({
            error,
            status: "error",
            data: null
        });

    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                // throw 打断一切进程
                throw new Error("请传入 Promise 类型数据");
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            setState({ ...state, status: "loading" });
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
        [config.throwOnError, setData, setError]
    );

    return {
        isIdle: state.status === "idle",
        isLoading: state.status === "loading",
        isError: state.status === "error",
        isSuccess: state.status === "success",
        run,
        setData,
        setError,
        ...state
    };
};
