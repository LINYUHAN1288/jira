/**
 * @file search-panel
 * @author linyuhan
 */

import React from 'react';
import { useTasksSearchParams } from 'utils/task';
import { useSetUrlSearchParam } from 'utils/url';
import { Row } from 'components/lib';
import { Button, Input } from 'antd';
import { UserSelect } from 'components/user-select';

export const SearchPanel = () => {
    const searchParams = useTasksSearchParams();
    const setSearchParams = useSetUrlSearchParam();

    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined
        });
    };

    return (
        <Row marginBottom={4} gap={true}>
            <Input
                style={{ width: '20rem' }}
                value={searchParams.name}
                onChange={e => setSearchParams({ name: e.target.value })}
            />
            <UserSelect />
            <Button onClick={reset}>清除筛选器</Button>
        </Row>
    );
};
