/**
 * @file task-type-select
 * @author linyuhan
 */

import { IdSelect } from 'components/id-select';
import { useTaskTypes } from 'utils/task';

export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: taskTypes } = useTaskTypes();
    return <IdSelect options={taskTypes || []} {...props} />;
};
