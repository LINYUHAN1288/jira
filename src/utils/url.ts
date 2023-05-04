/**
 * @file url query hooks
 * @author linyuhan
 */

import { useMemo, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject, subset } from 'utils';

/**
 * 返回页面 url 中，指定键的参数值
 * @param keys 键值数组
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const [stateKeys] = useState(keys);
    return [
        useMemo(
            () =>
                subset(Object.fromEntries(searchParams), stateKeys) as {
                    [key in K]: string;
                },
            [searchParams, stateKeys]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            return setSearchParams(params);
        }
    ] as const;
};

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
        const obj = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params
        }) as URLSearchParamsInit;
        return setSearchParams(obj);
    };
};
