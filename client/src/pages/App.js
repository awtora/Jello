import '../styles/App.scss';

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UserMenu} from "../components/UserMenu";
import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import {LoginForm} from "./LoginForm";
import {AuthRoute, PrivateRoute} from "../helpers/RouteWrappers";
import Board from "./Board";
import {UserBoards} from "./UserBoards";
import {getUserBoards} from "../store/actions/BoardActions";
import {UserEditor} from "./UserEditor";
import {getInvites} from "../store/actions/InviteActions";
import {Alert} from "../components/Alert";

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.userStore.user
    })

    useEffect(() => {
        if (user?.id) {
            dispatch(getInvites(user.id));
            dispatch(getUserBoards(user.id));
        }
    },[user])

    return (
        <Router>
            <div className="app">
                <div className="app-header">
                    <h1 className="app-header__title">Welcome to Jello</h1>
                    {user ? <div className="app-header__profile">
                        <UserMenu user={user}/>
                    </div> : null}
                </div>
                <div className="app-alert">
                <Alert/>
                </div>
                <Switch>
                    <AuthRoute path="/login">
                        <LoginForm/>
                    </AuthRoute>
                    <PrivateRoute exact path="/boards">
                        <UserBoards/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/boards/:id">
                        <Board/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/profile">
                        <UserEditor/>
                    </PrivateRoute>
                    <Redirect exact to="/login" from="/"/>
                </Switch>
            </div>
        </Router>
    );
}
