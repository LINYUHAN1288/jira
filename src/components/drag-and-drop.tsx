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
            {(provided) => {
                return React.cloneElement(children, {
                    ...provided.draggableProps,
                    ...provided.dragHandleProps,
                    ref: provided.innerRef
                });
            }}
        </Draggable>
    );
};
