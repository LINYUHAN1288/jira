import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [callback]);
};

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 在 value 变化时设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 在上一个 useEffect 处理完之后再运行
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};
