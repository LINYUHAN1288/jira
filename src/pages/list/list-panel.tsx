/**
 * @file list panel 列表面板
 * @author linyuhan
 */

// import React from "react";
import { User } from "types/user";
import { TableProps, Table } from "antd";
import { Project } from "types/project";
import { Pin } from "components/pin";

interface ListProps extends TableProps<Project> {
    users: User[];
}

const columns = [
    {
        title: <Pin checked={true} disabled={true} />,
        render: (value: unknown, project: Project) => {
            return <Pin checked={project.pin} />;
        }
    }
];

export const ListPanel = ({ users, ...props }: ListProps) => {
    return (
        <Table rowKey={"id"} pagination={false} columns={columns} {...props} />
    );
};
