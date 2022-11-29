import React, {useState} from 'react';
import {Input} from 'reactstrap';

import '../styles/List.scss';
import {useDispatch, useSelector} from 'react-redux';
import EditButtons from "./EditButtons";
import {postNewList, putUpdateListTitle} from "../store/actions/ListActions";

const ListEditor = ({lastListId, listId, handleCancel, currentTitle, saveLabel}) => {
    const [title, setTitle] = useState(currentTitle);
    const boardId = useSelector((state) => state.boardStore.activeBoard)

    const dispatch = useDispatch();

    const handleSave = () => {
        if (!currentTitle) {
            dispatch(postNewList(boardId, {title: title, items: []}));
        } else {
            dispatch(putUpdateListTitle([listId, title]))
        }
        handleCancel();
    };

    return (
        <div className="list-editor">
            <Input
                className="list-editor_input"
                placeholder="Enter the title for this list"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                bsSize="auto"
            />
            <EditButtons handleCancel={handleCancel} handleSave={handleSave}
                         saveLabel={saveLabel}/>
        </div>
    );
};

export default ListEditor;
