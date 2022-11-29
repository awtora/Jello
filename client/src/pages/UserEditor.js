import '../styles/UserEditor.scss'

import React, {useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {postUpdateLogin, postUpdatePassword} from "../store/actions/UserActions";
import {setAlertWithTimeout} from "../store/actions/AlertActions";

export const UserEditor = () => {
    const user = useSelector(state => state.userStore.user)
    const [newLogin, setNewLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChangeLogin = (event) => setNewLogin(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)

    const updateUser = () => {
        if (newLogin || password) {
            if (newLogin) {
                dispatch(postUpdateLogin(user.id, newLogin))
            }

            if (password) {
                dispatch(postUpdatePassword(user.id, password))
            }
        } else {
            dispatch(setAlertWithTimeout("You didn't change any data!"))
        }
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <div className="container">
            <Form className="userprofile">
                <FormGroup className="userprofile-form">
                    <Label className="userprofile-form__label">Change login:</Label>
                    <Input className="userprofile-form__input" defaultValue={user.login} value={newLogin}
                           onChange={handleChangeLogin}/>
                </FormGroup>
                <FormGroup className="userprofile-form">
                    <Label className="userprofile-form__label">Enter new password:</Label>
                    <Input className="userprofile-form__input" type="password" placeholder="Leave this field empty if you don't want to change it" onChange={handleChangePassword}/>
                </FormGroup>
                <Button className="userprofile-button" color="success" onClick={updateUser}>Submit</Button>
                <Button className="userprofile-button" onClick={goBack}>Go back</Button>
            </Form>
        </div>
    )
}