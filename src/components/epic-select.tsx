/**
 * @file epic-select.tsx 任务组选择器
 * @author linyuhan
 */

import React from 'react';
import { IdSelect } from './id-select';
import { useEpics } from 'utils/epic';

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: epics } = useEpics();
    return <IdSelect options={epics || []} {...props} />;
};
