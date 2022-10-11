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
//
// const PreviewPics = ({photos}) => {
//     // const [images, setImages] = useState(photos)
//
//     const handleDragEnd = ({active, over}) => {
//         const activeIndex = active.data.current.sortable.index;
//         const overIndex = over.data.current?.sortable.index || 0;
//
//         // setImages((items) => {
//         //     return arrayMoveImmutable(items, activeIndex, overIndex)
//         // });
//     }
//     console.log(photos)
//     return (
//             <DndContext
//                 onDragEnd={handleDragEnd}>
//                 <SortableContext items={photos} strategy={horizontalListSortingStrategy}>
//                     {photos.map((pic) => {
//                         return <SortableItem  key={Math.random() * 1000}>

//                         </SortableItem>
// })
//                     }
//                 </SortableContext>
//             </DndContext>
//         );
//     };
//
// export default PreviewPics;
//
// import React, {useState} from 'react';
// import {
//     DndContext,
//     closestCenter,
//     MouseSensor,
//     TouchSensor,
//     DragOverlay,
//     useSensor,
//     useSensors,
// } from '@dnd-kit/core';
// import {
//     arrayMove,
//     SortableContext,
//     rectSortingStrategy,
// } from '@dnd-kit/sortable';
//
// import {Grid} from './Grid';
// import {SortablePhoto} from './SortablePhoto';
// import {Photo} from './Photo';


export const PreviewPics = ({photos}) => {
    const [items, setItems] = useState(photos);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        setItems(photos)
    }, [photos])

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
                        <Photo
                            key={Math.random() * 1000}
                            url={backendUrl + pic?.url}
                            style={{width: '200px', height: 'auto'}}
                        />
                    ))}
            </SortableContext>
        </DndContext>
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const {active, over} = event;

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
