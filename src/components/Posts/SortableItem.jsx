import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {backendUrl} from "../../graphql/BackendUrl";
import React from "react";
import {Photo} from "./Photo";

export const SortableItem = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});
    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        // width: 110,
        // height: 100,
        //display: "flex",
        //alignItems: "center",
        //paddingLeft: 5,
        //border: "1px solid gray",
        //borderRadius: 5,
        //marginBottom: 5,
        //userSelect: "none",
        cursor: "grab",
        //boxSizing: "border-box"
    };

    console.log(props)
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