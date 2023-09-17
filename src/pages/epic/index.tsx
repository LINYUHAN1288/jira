import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, List, Modal } from 'antd';
import { Epic } from 'types/epic';
import { Row, PageContainer } from 'components/lib';
import { CreateEpic } from './create-epic';
import { useProjectInUrl } from 'utils/projects';
import { useDeleteEpic, useEpicQueryKey, useEpicSearchParams, useEpics } from 'utils/epic';
import { useTasks } from 'utils/task';

export const EpicPage = () => {
    const { data: currentProject } = useProjectInUrl();
    const { data: epics } = useEpics(useEpicSearchParams());
    const { data: tasks } = useTasks({ projectId: currentProject?.id });
    const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
    const [epicCreateOpen, setEpicCreateOpen] = useState(false);

    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
            content: '点击确定删除',
            okText: '确定',
            onOk() {}
        });
    };

    return (
        <PageContainer>
            <Row between={true}>
                <h1>任务组</h1>
                <Button onClick={() => setEpicCreateOpen(true)} type="link">
                    创建
                </Button>
            </Row>
            <List style={{ overflow: 'scroll' }} dataSource={epics} />
            <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen} />
        </PageContainer>
    );
};
