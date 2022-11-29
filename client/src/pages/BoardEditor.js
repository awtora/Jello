import React, {useState} from "react";
import {Input} from "reactstrap";
import EditButtons from "../components/EditButtons";
import {useDispatch, useSelector} from "react-redux";
import {postDeleteBoard, postNewBoard, putUpdateBoardName} from "../store/actions/BoardActions";

export const BoardEditor = ({currentName, boardId, saveLabel, handleCancel}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(currentName);
    const creatorId = useSelector((state) => {
        return state.userStore.user.id
    })

    const handleSave = () => {
        if(!currentName) {
            dispatch(postNewBoard(name, creatorId))
            handleCancel()
        }
        else {
            dispatch(putUpdateBoardName(boardId ,name));
            handleCancel();
        }
    }

    const handleDelete = () => {
        dispatch(postDeleteBoard(boardId));
        handleCancel();
    }

    return(
        <div className="userboards-editor">
            <Input
                className="board-editor__input"
                placeholder="Enter the title for this board"
                value={name}
                onChange={(event => setName(event.target.value))}
                bsSize="auto"
            />
            <EditButtons handleCancel={handleCancel} saveLabel={saveLabel} handleSave={handleSave} handleDelete={handleDelete}/>
        </div>
    )
}
