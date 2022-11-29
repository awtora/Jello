import React from 'react';
import { Card as CardWrapper, CardBody, CardText, CardTitle } from 'reactstrap';
import CardEditor from './CardEditor';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {postDeleteItem} from "../store/actions/ListActions";

const Card = ({isAdding, handleEditing, editingCardId, id, listId, title, text, canEdit }) => {
    const dispatch = useDispatch();

    const startEditing = () => {
        handleEditing(id);
    };
    const endEditing = () => {
        handleEditing(null);
    };

    const handleDelete = () => {
        dispatch(postDeleteItem(listId, id));
        endEditing();
    };

    return (
        <div>
                {canEdit && (editingCardId === id) ? (
                    <CardEditor
                        listId={listId}
                        itemId={id}
                        handleCancel={endEditing}
                        handleDelete={handleDelete}
                        saveLabel={isAdding ? 'Add card' : 'Save'}
                        currentTitle={title}
                        currentText={text}
                    />
                ) : (
                    <CardWrapper className="card">
                        <CardBody>
                            <CardTitle tag="h5">{title}</CardTitle>
                            <CardText>{text}</CardText>
                            <div className="card__icon" onClick={startEditing}>
                                <FontAwesomeIcon icon={faEdit} />
                            </div>
                        </CardBody>
                    </CardWrapper>
                )}
        </div>
    );
};

export default Card;
