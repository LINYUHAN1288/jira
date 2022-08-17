import React from "react";
import { User } from "types/user";
import { TableProps } from "antd";
import { Project } from "types/project";

interface ListProps extends TableProps<Project> {
    users: User[];
}

export const ListPanel = ({}) => {};
