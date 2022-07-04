import React from "react";
import {useSortable} from "@dnd-kit/sortable";

export const DraggableItemContainer = ({cardId, children}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: cardId});
    const style = {
        '--translate-x': transform ? transform.x : 0,
        '--translate-y': transform ? transform.y : 0,
        '--transition': transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};