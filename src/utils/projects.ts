/**
 * @file projects hooks
 * @author linyuhan
 */

import { useHttp } from 'utils/http';
import { Project } from 'types/project';
import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url';
import { useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useLocation } from 'react-router-dom';

export const useProjects = (params?: Partial<Project>) => {
    const client = useHttp();
    return useQuery<Project[]>(['projects', cleanObject(params)], () =>
        client('projects', { data: params })
    );
};

export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const;
};

/**
 * 获取 url 中的 projectId
 * @returns project id
 */
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};

export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
        ['project', { id }],
        () => client(`projects/${id}`),
        {
            enabled: Boolean(id)
        }
    )
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());
