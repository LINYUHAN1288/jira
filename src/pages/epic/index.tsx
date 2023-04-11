import React from 'react';
import dayjs from 'dayjs';
import { Button, List, Modal } from 'antd';
import { Epic } from 'types/epic';
import { Row, PageContainer } from 'components/lib';

export const EpicPage = () => {
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
                <Button type="link">创建</Button>
            </Row>
            <List />
        </PageContainer>
    );
};
