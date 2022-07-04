import React, {useState} from 'react';
import {Input} from 'reactstrap';

import '../styles/Card.scss';
import {useDispatch} from 'react-redux';
import EditButtons from "./EditButtons";
import {postNewItem, putUpdateItem} from "../store/actions/ListActions";

const CardEditor = ({listId, itemId, saveLabel, handleDelete, handleCancel, currentTitle, currentText}) => {
    const [title, setTitle] = useState(currentTitle);
    const [text, setText] = useState(currentText);
    const dispatch = useDispatch();

    const handleSave = () => {
        if (!currentTitle && !currentText) {
            dispatch(postNewItem([listId, {title: title, text: text}]));
            handleCancel();
        } else {
            dispatch(putUpdateItem([listId, itemId, {title: title, text: text}]));
            handleCancel();
        }
    };

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeText = (event) => setText(event.target.value);

    return (
        <div className="card-editor">
            <div className="card-editor__inputGroup">
                <Input
                    className="card-editor__inputGroup-title"
                    placeholder="Enter the title of this card"
                    bsSize="auto"
                    value={title}
                    onChange={handleChangeTitle}
                />
                <Input
                    className="card-editor__inputGroup-text"
                    type="textarea"
                    placeholder="Enter the text for this card"
                    bsSize="auto"
                    value={text}
                    onChange={handleChangeText}
                />
            </div>
            <EditButtons handleDelete={handleDelete} handleCancel={handleCancel} handleSave={handleSave}
                         saveLabel={saveLabel}/>
        </div>
    );
};

export default CardEditor;
