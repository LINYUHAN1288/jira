/**
 * @file popover
 * @author linyuhan
 */

import { Popover, Divider, List, Typography } from 'antd';
import styled from '@emotion/styled';
import { ButtonNoPadding } from 'components/lib';
import { useProjects } from 'utils/projects';
import { useUsers } from 'utils/user';
import type { Project } from 'types/project';
import type { User } from 'types/user';
import React from 'react';

interface PopoverParams {
    data?: Project[] | User[];
    refetch: () => {};
    title: string;
    text: string;
    buttonText?: string;
}

const CommonPopover = ({ data, refetch, title, text, buttonText }: PopoverParams) => {
    const content = (
        <ContentContainer>
            <Typography.Text type="secondary">{text}</Typography.Text>
            <List>
                {data?.map(item => {
                    <List.Item key={item.id}>
                        <List.Item.Meta title={item.name} />
                    </List.Item>;
                })}
            </List>
            <Divider />
            <ButtonNoPadding type="link">{buttonText}</ButtonNoPadding>
        </ContentContainer>
    );

    return (
        <Popover onVisibleChange={() => refetch()} placement="bottom" content={content}>
            <span>{title}</span>
        </Popover>
    );
};

export const ProjectPopover = () => {
    const { data, refetch } = useProjects();
    const pinnedProjects = data?.filter(project => project.pin);

    return CommonPopover({
        data: pinnedProjects,
        refetch,
        title: '项目',
        text: '收藏项目',
        buttonText: '创建项目'
    });
};

export const UserPopover = () => {
    const { data, refetch } = useUsers();
    return CommonPopover({
        data,
        refetch,
        title: '组员',
        text: '组员列表'
    });
};

const ContentContainer = styled.div`
    min-width: 30rem;
`;
