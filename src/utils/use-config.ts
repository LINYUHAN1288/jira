/**
 * @file use-config.ts
 * @author linyuhan
 */

import { QueryKey, useQueryClient } from 'react-query';
import { Task } from 'types/task';
import { reorder } from 'utils/reorder';

type CallbackFn = (target: any, old?: any[]) => any[];

export const useConfig = (queryKey: QueryKey, callback: CallbackFn) => {
    const queryClient = useQueryClient();
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        async onMutate(target: any) {
            const previousItems = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old);
            });
            return { previousItems };
        },
        onError: (context: any) => {
            queryClient.setQueryData(queryKey, context.previousItems);
        }
    };
};

export const useAddConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
};

export const useEditConfig = (queryKey: QueryKey) => {
    return useConfig(
        queryKey,
        (target, old) => old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) || []
    );
};

export const useDeleteConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => old?.filter((item) => item.id !== target.id) || []);
};

export const useReorderTaskConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => {
        const orderedList = reorder({ list: old, ...target }) as Task[];
        return orderedList.map((item) =>
            item.id === target.fromId ? { ...item, billboardId: target.billboardId } : item
        );
    });
};

export const useReorderBillboardConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));
};
