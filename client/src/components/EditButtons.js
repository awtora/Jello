import React from "react";
import {Button} from "reactstrap";

import '../styles/EditButtons.scss'

const EditButtons = ({handleSave, saveLabel, handleDelete, handleCancel}) => (
    <div className="edit-buttons">
        <Button
            className="edit-buttons__btn"
            color="success"
            onClick={handleSave}
        >
            {saveLabel}
        </Button>
        {handleDelete && (
            <Button
                className="edit-buttons__btn"
                color="danger"
                onClick={handleDelete}
            >
                Delete
            </Button>
        )}
        <Button close size="lg" onClick={handleCancel}/>
    </div>
);

export default EditButtons