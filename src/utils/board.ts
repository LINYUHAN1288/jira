/**
 * @file board hook
 * @author linyuhan
 */

import { QueryKey, useMutation, useQuery } from 'react-query';
import { Board } from 'types/board';
import { useHttp } from 'utils/http';
import { useAddConfig, useDeleteConfig, useReorderBoardConfig } from './use-config';
import { useProjectIdInUrl } from './projects';

/**
 * 查询
 * @param params
 */
export const useBoard = (params?: Partial<Board>) => {
    const client = useHttp();

    return useQuery<Board[]>(['board', params], () =>
        client('board', { data: params })
    );
};

/**
 * 添加
 * @param queryKey
 */
export const useAddBoard = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation((params: Partial<Board>) => client('board', {
        data: params,
        method: 'POST'
    }), useAddConfig(queryKey));
};

/**
 * 删除
 * @param queryKey 
 */
export const useDeleteBoard = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(({id}: {id: number}) => client(`board/${id}`, {
        method: 'DELETE'
    }), useDeleteConfig(queryKey));
};

export const useBoardQueryKey = () => ['board', () => ({ projectId: useProjectIdInUrl() })];