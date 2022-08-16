/**
 * @file dnd.tsx 拖拽组件
 * @author linyuhan
 */

import React, { ReactNode } from "react";
import {
    Draggable,
    Droppable,
    DroppableProps,
    DraggableProps,
    DroppableProvided,
    DroppableProvidedProps
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };
type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
type DropChildProps = Partial<
    { provided: DroppableProvided } & DroppableProvidedProps
> &
    React.HTMLAttributes<HTMLDivElement>;

export const Drop = ({ children, ...props }: DropProps) => {
    return (
        <Droppable {...props}>
            {(provided) => {
                if (React.isValidElement(children)) {
                    return React.cloneElement(children, {
                        ...provided.droppableProps,
                        ref: provided.innerRef,
                        provided
                    });
                }
                return <div />;
            }}
        </Droppable>
    );
};

// forwardRef 获取深层次子孙组件的 DOM 元素
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
    ({ children, ...props }, ref) => (
        <div ref={ref} {...props}>
            {children}
            {props.provided?.placeholder}
        </div>
    )
);

export const Drag = ({ children, ...props }: DragProps) => {
    return (
        <Draggable {...props}>
            {(provided, snapshot) => {
                if (React.isValidElement(children)) {
                    return React.cloneElement(children, {
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        ref: provided.innerRef,
                        style: getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps?.style
                        )
                    });
                }
                return <div />;
            }}
        </Draggable>
    );
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 8px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});
