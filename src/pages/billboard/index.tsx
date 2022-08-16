/**
 * @file billboard page 公告页面
 * @author linyuhan
 */

import { useDocumentTitle } from "utils";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "react-beautiful-dnd";
import styled from "@emotion/styled";
import React from "react";

const getItems = (cnt: number) =>
    Array.from({ length: cnt }, (v, k) => k).map((k) => ({
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
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 8px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250
});

export const BillboardPage = () => {
    useDocumentTitle("Billboard Page");
    let items = getItems(10);
    const onDragEnd = (res: DropResult) => {
        if (!res.destination) {
            return;
        }
        items = reorder(items, res.source.index, res.destination.index);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"billboard"} type={"COLUMN"}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3.2rem;
    width: 100%;
    background-color: blue;
`;
