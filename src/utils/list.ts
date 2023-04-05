import { useMemo } from 'react';
import { useUrlQueryParam, useSetUrlSearchParam } from './url';

export const useListSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    return [
        useMemo(() => {
            return {
                ...param,
                personId: Number(param.personId) || undefined
            };
        }, []),
        setParam
    ] as const;
};
