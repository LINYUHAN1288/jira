/**
 * @file create-Task 创建任务
 * @author linyuhan
 */

import { useEffect, useState } from 'react';
import { useAddTask, useTasksQueryKey } from 'utils/task';
import { useProjectIdInUrl } from 'utils/projects';
import { Card, Input } from 'antd';

export const CreateTask = ({ boardId }: { boardId: number }) => {
    const [name, setName] = useState('');
    const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
    const projectId = useProjectIdInUrl();
    const [inputMode, setInputMode] = useState(false);

    const submit = async () => {
        await addTask({ projectId, name, boardId });
        setInputMode(false);
        setName('');
    };

    const toggle = () => setInputMode(mode => !mode);

    useEffect(() => {
        if (!inputMode) {
            setName('');
        }
    }, [inputMode]);

    if (!inputMode) {
        return <div onClick={toggle}>+Create Task</div>;
    }

    return (
        <Card>
            <Input
                onBlur={toggle}
                autoFocus={true}
                onPressEnter={submit}
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </Card>
    );
};
