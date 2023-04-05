import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'types/task';
import { Project } from 'types/project';
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from './use-config';
import { useDebounce } from 'utils';

export interface SortProps {
    fromId: number;
    referenceId: number;
    type: 'before' | 'after';
    fromBillboardId?: number;
    toBillboardId?: number;
}

export const useTask = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(['task', { id }], () => client(`tasks/${id}`), {
        enabled: Boolean(id)
    });
};

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };

    return useQuery<Task>(['tasks', debouncedParam], () => {
        return client('tasks', { data: debouncedParam });
    });
};

export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation((params: Partial<Task>) => {
        return client(`tasks`, {
            data: params,
            method: 'POST'
        });
    }, useAddConfig(queryKey));
};

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation((params: Partial<Task>) => {
        return client(`tasks/${params.id}`, {
            method: 'PATCH',
            data: params
        });
    }, useEditConfig(queryKey));
};

export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(({ id }: { id: number }) => {
        return client(`tasks/${id}`, {
            method: 'DELETE'
        });
    }, useDeleteConfig(queryKey));
};

export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation((params: SortProps) => {
        return client('tasks/reorder', {
            data: params,
            method: 'POST'
        });
    }, useReorderTaskConfig(queryKey));
};
