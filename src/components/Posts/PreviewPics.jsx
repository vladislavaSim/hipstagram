import React, {forwardRef, useEffect, useMemo, useState} from "react";
import {DndContext, closestCenter, DragOverlay} from "@dnd-kit/core";
import {
    arrayMove,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    SortableContext,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {backendUrl} from "../../graphql/BackendUrl";
import {Photo} from "./Photo";
export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <img src={backendUrl + props.url} alt={'preview-pic'} className='preview-img'/>
        </div>
    );
}

export default function PreviewPics({photos}) {
    const [items, setItems] = useState(photos);
    const [activeId, setActiveId] = useState(null);
    console.log(items)
    useEffect(() => {
        setItems(photos)
    }, [photos])

    const itemIds = useMemo(() => items.map((item) => item.id), [items]);

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item._id === active.id);
                const newIndex = items.findIndex((item) => item._id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    function handleDragCancel() {
        setActiveId(null);
}

    console.log(backendUrl + items.find(item => item._id === activeId).url)
    return (
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                    {items.map((item) => (
                        <SortableItem key={item._id} id={item._id} url={item.url}/>
                    ))}
                </SortableContext>

                <DragOverlay adjustScale={true}>
                    {activeId ? (
                        <Photo
                            src={backendUrl + items.find(item => item._id === activeId).url}
                            index={items.indexOf(activeId)} />
                    ) : null}
                </DragOverlay>
            </DndContext>
    );
}
// export const Photo = forwardRef(({url, index, faded, ...props}, ref) => {
//     console.log(url)
//     return <div ref={ref} {...props}>
//         <img src={url} className='preview-img'alt='preview-img'/>
//     </div>;
// });
