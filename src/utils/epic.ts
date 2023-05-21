/**
 * @file epic hooks for 任务组
 * @author linyuhan
 */
import { useHttp } from './http';
import { Epic } from 'types/epic';
import { QueryKey, useMutation, useQuery } from 'react-query';

export const useEpics = (params?: Partial<Epic>) => {
    const client = useHttp();
    return useQuery<Epic[]>(['epics', params], () => client('epics', { data: params }));
};