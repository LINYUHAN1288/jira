/**
 * @file epic hooks for 任务组
 * @author linyuhan
 */
import { useHttp } from './http';
import { Epic } from 'types/epic';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { useAddConfig, useDeleteConfig } from './use-config';
import { useProjectIdInUrl } from './projects';

export const useEpics = (params?: Partial<Epic>) => {
    const client = useHttp();
    return useQuery<Epic[]>(['epics', params], () => client('epics', { data: params }));
};

export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        (params: Partial<Epic>) => client('epics', { data: params, method: 'POST' }),
        useAddConfig(queryKey)
    );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({ id }: { id: number }) => client(`epics/${id}`, { method: 'DELETE' }),
        useDeleteConfig(queryKey)
    );
};

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicQueryKey = () => ['epics', useEpicSearchParams()];