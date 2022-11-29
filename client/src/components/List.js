import '../styles/List.scss';

import React, {useState} from 'react';
import Card from './Card';
import {useDroppable} from '@dnd-kit/core';
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import CardEditor from './CardEditor';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import ListEditor from "./ListEditor";
import {postDeleteList} from "../store/actions/ListActions";
import {DraggableItemContainer} from "./DraggableItemContainer";

const List = ({id, title, cards, canEdit}) => {
    const {setNodeRef} = useDroppable({
        id: id,
    });
    const boardId = useSelector((state) => state.boardStore.activeBoard)
    const [isAddingCard, toggleAddingCard] = useState(false);
    const [isEditingCardId, setEditingCardId] = useState(false);
    const [isEditingList, setEditingList] = useState(false);

    const dispatch = useDispatch();

    const handleAddCardClick = () => {
        toggleAddingCard(!isAddingCard);
    };

    const handleDeleteClick = () => {
        dispatch(postDeleteList(boardId, id));
    };

    const handleEditingCard = (cardId) => {
        setEditingCardId(cardId);
    };

    const handleEditingList = () => {
        setEditingList(!isEditingList)
    }

    return (
        <div className="list" ref={setNodeRef}>
            <div className="list-header">
                {canEdit && isEditingList ? (<ListEditor listId={id} handleCancel={handleEditingList} currentTitle={title} saveLabel='Save'/>) :
                    (<h3 className="list-header__title" onClick={handleEditingList}>{title}</h3>)
                }
                <FontAwesomeIcon className="list-header__icon" icon={faTrashAlt} size="lg" onClick={handleDeleteClick}/>
            </div>
            <div className="list-cards">
                <SortableContext items={cards.map((item, index) => item._id)} strategy={rectSortingStrategy}>
                    {cards.map((item, index) =>
                        isEditingCardId ? (
                            <Card
                                key={index}
                                handleEditing={handleEditingCard}
                                editingCardId={isEditingCardId}
                                id={item._id}
                                listId={id}
                                title={item.title}
                                text={item.text}
                                canEdit={canEdit}
                            />
                        ) : (
                            <DraggableItemContainer key={item._id} cardId={item._id}>
                                <Card
                                    handleEditing={handleEditingCard}
                                    editingCardId={isEditingCardId}
                                    key={index}
                                    id={item._id}
                                    title={item.title}
                                    text={item.text}
                                />
                            </DraggableItemContainer>
                        )
                    )}
                    {isAddingCard ? (
                        <CardEditor saveLabel='Save' handleCancel={handleAddCardClick} listId={id}/>
                    ) : (
                        (<Button className="list-cards__addCard" color="success" onClick={handleAddCardClick} disabled={canEdit}>
                            Add card
                        </Button>)
                    )}
                </SortableContext>
            </div>
        </div>
    );
};

export default List;