/**
 * @file list page 项目列表页面
 * @author linyuhan
 */

import { useDebounce, useDocumentTitle } from "utils";
import { useProjects, useProjectsSearchParams } from "utils/projects";
import { useUsers } from "utils/user";
import { PageContainer, Row, ButtonNoPadding, ErrorBox } from "components/lib";
import { SearchPanel } from "./search-panel";
import { ListPanel } from "./list-panel";

export const ListPage = () => {
    useDocumentTitle("项目列表", false);

    const [param, setParam] = useProjectsSearchParams();
    const {
        isLoading,
        error,
        data: list
    } = useProjects(useDebounce(param, 200));
    const { data: users } = useUsers();

    return (
        <PageContainer>
            <Row marginBottom={2} between={true}>
                <SearchPanel
                    users={users || []}
                    param={param}
                    setParam={setParam}
                ></SearchPanel>
                <ListPanel users={users || []}></ListPanel>
                <ErrorBox error={error}></ErrorBox>
            </Row>
        </PageContainer>
    );
};
