/**
 * @file board page 公告页面
 * @author linyuhan
 */

import React, { useCallback } from 'react';
import { useDocumentTitle } from 'utils';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';
import { PageContainer } from 'components/lib';
import { SearchPanel } from './search-panel';
import { Spin } from 'antd';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { useProjectInUrl } from 'utils/projects';
import { useBoard, useBoardQueryKey, useBoardSearchParams, useReorderBoard } from 'utils/board';
import { useTasks, useTasksQueryKey, useTasksSearchParams, useReorderTask } from 'utils/task';

const getItems = (cnt: number) =>
    Array.from({ length: cnt }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item-${k}`
    }));

const reorder = (list: any, startIndex: number, endIndex: number): any => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 8px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
});

export const BoardPage = () => {
    useDocumentTitle('Board Page');

    const { data: currentProject } = useProjectInUrl();
    const { data: boards, isLoading: boardIsLoading } = useBoard(useBoardSearchParams());

    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
    const isLoading = taskIsLoading || boardIsLoading;

    const onDragEnd = useDragEnd();

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <PageContainer>
                <h1>{currentProject?.name}</h1>
                <SearchPanel />
                {isLoading ? (
                    <Spin size="large" />
                ) : (
                    <ColumnsContainer>
                        <Drop type={'COLUMN'} direction="horizontal" droppableId="board">
                            <DropChild style={{ display: 'flex' }}>
                                {boards?.map((board, index) => (
                                    <Drag key={board.id} draggableId={'board' + board.id} index={index}>
                                        <div></div>
                                    </Drag>
                                ))}
                            </DropChild>
                        </Drop>
                    </ColumnsContainer>
                )}
            </PageContainer>
        </DragDropContext>
    );
};

export const useDragEnd = () => {
    const { data: boards } = useBoard(useBoardSearchParams());
    const { mutate: reorderBoard } = useReorderBoard(useBoardQueryKey());
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
    const { data: allTasks = [] } = useTasks(useTasksSearchParams());

    return useCallback(({ source, destination, type }: DropResult) => {
        if (!destination) {
            return;
        }

        if (type === 'COLUMN') {
            const fromId = boards?.[source.index].id;
            const toId = boards?.[destination.index].id;
            if (!fromId || !toId || fromId === toId) {
                return;
            }
            const type = destination.index > source.index ? 'after' : 'before';
            reorderBoard({ fromId, referenceId: toId, type });
        }

        if (type === 'ROW') {
            const fromBoardId = +source.droppableId;
            const toBoardId = +destination.droppableId;
            const fromTask = allTasks.filter((task: any) => task.boardId === fromBoardId)[source.index];
            const toTask = allTasks.filter((task: any) => task.boardId === toBoardId)[destination.index];

            if (fromTask?.id === toTask?.id) {
                return;
            }
            reorderTask({
                fromId: fromTask?.id,
                referenceId: toTask?.id,
                fromBoardId,
                toBoardId,
                type: fromBoardId === toBoardId && destination.index > source.index ? 'after' : 'before'
            });
        }
    }, []);
};

export const ColumnsContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    flex: 1;
`;
