/**
 * @file task hook
 * @author linyuhan
 */

import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'types/task';
import { Project } from 'types/project';
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from './use-config';
import { useDebounce } from 'utils';
import { useUrlQueryParam } from './url';
import { useMemo, useCallback } from 'react';
import { useProjectIdInUrl } from './projects';

export interface SortProps {
    fromId: number;
    referenceId: number;
    type: 'before' | 'after';
    fromBoardId?: number;
    toBoardId?: number;
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

    return useQuery<Task[]>(['tasks', debouncedParam], () => {
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

export const useTasksSearchParams = () => {
    const [params] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId']);
    const projectId = useProjectIdInUrl();

    return useMemo(
        () => ({
            projectId,
            typeId: Number(params.typeId) || undefined,
            processorId: Number(params.processorId) || undefined,
            tagId: Number(params.tagId) || undefined,
            name: params.name
        }),
        [projectId, params]
    )
};

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];

export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);

    const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

    const startEdit = useCallback((id: number) => {
        setEditingTaskId({ editingTaskId: id });
    }, [setEditingTaskId]);

    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: '' });
    }, [setEditingTaskId]);

    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
};

export const useTaskTypes = () => {
    const client = useHttp();
    
    return useQuery(['taskTypes'], () => client('taskTypes'));
};