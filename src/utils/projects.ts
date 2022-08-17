import { useHttp } from "utils/http";
import { Project } from "types/project";
import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
import { useQuery } from "react-query";
import { cleanObject } from "utils";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery<Project[]>(["projects", cleanObject(param)], () =>
        client("projects", { data: param })
    );
};

export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam
    ] as const;
};
