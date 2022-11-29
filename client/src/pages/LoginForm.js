import React, {useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

import '../styles/LoginForm.scss'
import {useDispatch} from "react-redux";
import {postSignIn, postSignUp} from "../store/actions/UserActions";
import {setAlertWithTimeout} from "../store/actions/AlertActions";

export const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const handleLoginInput = (event) => setLogin(event.target.value);
    const handlePasswordInput = (event) => setPassword(event.target.value)

    const handleSignIn = () => {
        if (login !== '' && password !== '') {
            dispatch(postSignIn({login: login, password: password}))
        } else {
            dispatch(setAlertWithTimeout('Please enter your login and password'));
        }
    }

    const handleSignUp = () => {
        if (login !== '' && password !== '') {
            dispatch(postSignUp({login: login, password: password}))
        } else {
            dispatch(setAlertWithTimeout('Please enter your desired login and password first'));
        }
    }

    return (
        <div className="container-fluid">
            <Form className="login-form">
                <h4>You must log in first</h4>
                <FormGroup>
                    <Label>Login</Label>
                    <Input className="login-form__input" value={login} onChange={handleLoginInput}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" className="login-form__input" value={password}
                           onChange={handlePasswordInput}/>
                </FormGroup>
                <div className="login-form__buttongroup">
                    <Button className="login-form__buttongroup-button" onClick={handleSignIn}>Sign in</Button>
                    <Button className="login-form__buttongroup-button" onClick={handleSignUp}>Sign up</Button>
                </div>
            </Form>
        </div>
    )
}
