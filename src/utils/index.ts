import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === "";

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [callback]);
};

export const cleanObject = (object?: { [key: string]: unknown }) => {
    if (!object) {
        return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
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

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        },
    };
};

export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });
};
