import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, useDroppable, MouseSensor, TouchSensor, closestCenter, DragOverlay
} from "@dnd-kit/core";
import {
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    SortableContext,
    useSortable,
    horizontalListSortingStrategy, arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {connect} from "react-redux";
import { arrayMoveImmutable } from 'array-move'
import {SortableItem} from './SortableItem'
import {backendUrl} from "../../graphql/BackendUrl";
import {Photo} from "./Photo";

export const PreviewPics = ({photos}) => {
    const [items, setItems] = useState(photos);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        setItems(photos)
    }, [photos])
    // console.log(photos)

    useEffect(() => {
        setItems(items)
    }, [items])
    console.log(items)
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >

            <SortableContext items={items} strategy={rectSortingStrategy}>

                    {items.map((pic) => (
                        <SortableItem
                            key={pic}
                            id={pic}
                            url={backendUrl + pic}
                            style={{width: '200px', height: 'auto'}}
                        />
                    ))}

            </SortableContext>
            <DragOverlay adjustScale={true} dropAnimation={{
                duration: 500,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}>

            </DragOverlay>
        </DndContext>
    );

    function handleDragStart(event) {
        setActiveId( event.active.url);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }
};

export default PreviewPics;
