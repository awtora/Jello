import '../styles/Board.scss';

import React, {useEffect, useState} from 'react';
import List from '../components/List';
import {closestCorners, DndContext, DragOverlay, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'reactstrap';
import ListEditor from '../components/ListEditor';
import {
    clearActiveLists,
    fetchBoardLists,
    postDeleteListItem,
    putMoveListItems,
    putUpdateListItems,
    updateList
} from "../store/actions/ListActions";
import Card from "../components/Card";
import arrayMove from 'array-move';
import {useParams} from "react-router-dom";
import {clearActiveBoard, setActiveBoard} from "../store/actions/BoardActions";
import {BoardManager} from "./BoardManager";
import {apiUrl} from "../config";
import axios from "axios";
import authHeader from "../helpers/AuthHeader";

const Board = (props) => {
    const dispatch = useDispatch();
    const {id: boardId} = useParams();
    const [oldListId, setOldListId] = useState(null);
    const [newListId, setNewListId] = useState(null);
    const [activeCard, setActiveCard] = useState(null)
    const [addList, toggleAddList] = useState(false);
    const [permissionsArray, setPermissions] = useState([]);
    const [currentUserPermissions, setCurrentUserPermissions] = useState({});
    const user = useSelector(state => state.userStore.user);
    const boardName = useSelector(state => {
        if (state.boardStore.boards.length) {
            return state.boardStore.boards.find(board => board._id === boardId).name
        } else {
            return ""
        }
    })

    const getPermissionsArray = () => {
        axios.get(apiUrl + 'users/boardPermissions', {
            headers: authHeader(),
            params: {
                boardId: boardId
            }
        }).then(res => {
            setPermissions(res.data.result)
            setCurrentUserPermissions(res.data.result.find(item => item._id === user.id).permissions)
        })
    }

    if (!permissionsArray.length) {
        getPermissionsArray()
    }

    useEffect(() => {

        dispatch(fetchBoardLists(boardId));
        dispatch(setActiveBoard(boardId))

        return () => {
            dispatch(clearActiveBoard());
            dispatch(clearActiveLists());
            // socket.disconnect()
        }
    }, [])

    const lists = useSelector((state) => {
        return state.listsStore.lists;
    });

    const [clonedLists, setClonedLists] = useState(null);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            delay: 100
        }
    });
    const sensors = useSensors(mouseSensor);

    const findContainer = (id) => {
        const containers = lists.map(list => list._id);

        if (containers.includes(id)) {
            return lists.find(list => list._id === id);
        }
        return lists.find((list) => list.items.find((item) => item._id === id))
    }

    const handleDragStart = (event) => {
        if (event.active.id) {
            setClonedLists(lists);
            let activeList = lists.find((list) => list.items.find((item) => item._id === event.active.id))
            let activeCard = activeList.items[activeList.items.indexOf(activeList.items.find(item => item._id === event.active.id))]
            setOldListId(lists.find((list) => list.items.find((item) => item._id === event.active.id))._id);
            setActiveCard(activeCard);
        }
    };

    const handleAddList = () => {
        toggleAddList(!addList);
    };

    const handleDragCancel = () => {
        if (clonedLists) {
            lists.forEach((list, index) => updateList(clonedLists[index]))
        }
        setClonedLists(null);
        setOldListId(null);
    }

    const handleDragOver = ({active, over, draggingRect}) => {
        if (!over) return;
        let activeCardId = active.id;
        let overId = over.id;
        let activeContainer = findContainer(active.id);
        let overContainer = findContainer(overId);
        let activeItems = activeContainer.items;
        let overItems = overContainer.items;
        const overIndex = overItems.indexOf(overItems.find(item => item._id === overId));
        const activeIndex = activeItems.indexOf(activeItems.find(item => item._id === activeCardId));
        if (activeContainer !== overContainer) {
            setNewListId(overContainer._id);
            let newIndex;

            const belowLastItemModifier = over &&
                overIndex === overItems.length - 1 &&
                draggingRect.offsetTop > over.rect.offsetTop + over.rect.height
                ? 1
                : 0;

            newIndex =
                overIndex >= 0 ? overIndex + belowLastItemModifier : overItems.length + 1;

            dispatch(updateList({
                ...activeContainer,
                items: activeContainer.items.filter(item => item._id !== activeCardId)
            }));
            dispatch(updateList({
                ...overContainer,
                items: [...overContainer.items.slice(0, newIndex), activeCard, ...overContainer.items.slice(newIndex, overContainer.items.length)]
            }))
        } else {
            if (active.id !== overId) {
                dispatch(updateList({
                    ...activeContainer,
                    items: arrayMove(activeContainer.items, activeIndex, overIndex)
                }))
            }
        }
    }

    const handleDragEnd = ({active, over}) => {
        if (!over) return;
        let newIndexToSend = lists.find(list => list.items.find(item => item._id === active.id)).items.findIndex(item => item._id === active.id)
        if (oldListId && newListId) {
            dispatch(postDeleteListItem(oldListId, active.id))
            dispatch(putUpdateListItems(newListId, active.id, newIndexToSend));
            setNewListId(null);
        } else {
            dispatch(putMoveListItems(oldListId, active.id, newIndexToSend))
        }
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                    sensors={sensors} collisionDetection={closestCorners}>
            <div className="board">
                <BoardManager boardId={boardId} boardName={boardName} permissionsArray={permissionsArray}
                              currentUserPermissions={currentUserPermissions} getPermissionsArray={getPermissionsArray}/>
                <div className="board-body">
                    {lists.map((item, index) => (
                        <List
                            key={lists[index]._id}
                            id={lists[index]._id}
                            title={lists[index].title}
                            cards={lists[index].items}
                            activeId={oldListId}
                            canEdit={currentUserPermissions.canEdit}
                        />
                    ))}
                    {addList ? (
                        <ListEditor saveLabel='Save'
                                    handleCancel={handleAddList}/>
                    ) : (
                        <Button className="board-body__addList" color="success" size="lg" onClick={handleAddList}
                                disabled={currentUserPermissions.canEdit}>
                            Add new list
                        </Button>
                    )}
                    <DragOverlay wrapperElement="ul">
                        {activeCard ? <Card id={activeCard._id}
                                            title={activeCard.title}
                                            text={activeCard.text}/> : null}
                    </DragOverlay>
                </div>
            </div>
        </DndContext>
    );
};

export default Board;
