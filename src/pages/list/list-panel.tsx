/**
 * @file list panel 列表面板
 * @author linyuhan
 */

// import React from "react";
import { User } from 'types/user';
import { TableProps, Table, Modal, Dropdown, Menu } from 'antd';
import { Project } from 'types/project';
import { Pin } from 'components/pin';
import { Link } from 'react-router-dom';
import { ButtonNoPadding } from 'components/lib';

interface ListProps extends TableProps<Project> {
    users: User[];
}

export const ListPanel = ({ users, ...props }: ListProps) => {
    return (
        <Table
            rowKey={'id'}
            pagination={false}
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    render: (value: unknown, project: Project) => {
                        return <Pin checked={project.pin} />;
                    }
                },
                {
                    title: '名称',
                    render: (value: unknown, project: Project) => {
                        return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>;
                    }
                },
                {
                    title: '部门',
                    dataIndex: 'organization'
                },
                {
                    title: '负责人',
                    render: (value: unknown, project: Project) => {
                        return <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>;
                    }
                },
                {
                    title: '创建时间',
                    render: (value, project) => {
                        return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>;
                    }
                },
                {
                    render: (value, project) => {
                        return <More project={project} />;
                    }
                }
            ]}
            {...props}
        />
    );
};

const More = ({ project }: { project: Project }) => {
    const deleteProject = (id: number) => {
        Modal.confirm({
            title: 'delete',
            okText: 'yes'
        });
    };
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item>编辑</Menu.Item>
                    <Menu.Item onClick={() => deleteProject(project.id)} key={'delete'}>
                        删除
                    </Menu.Item>
                </Menu>
            }
        >
            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
        </Dropdown>
    );
};
