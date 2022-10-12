import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {backendUrl} from "../../graphql/BackendUrl";
import React from "react";
import {Photo} from "./Photo";

export const SortableItem = (props) => {
    const sortable = useSortable({id: props.id});
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        cursor: 'grab',
        transition,
    };

    return (
        <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
            <Photo
                ref={setNodeRef}
                style={itemStyle}
                {...props}
                {...attributes}
                {...listeners}
            />
        </div>
    );
};