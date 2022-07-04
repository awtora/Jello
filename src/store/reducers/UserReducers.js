import {createReducer} from "@reduxjs/toolkit";
import {LOG_OUT, SIGN_IN, UPDATE_LOGIN, UPDATE_PERMISSIONS} from "../actions/actionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ?
    {isLoggedIn: true, user} :
    {isLoggedIn: false, user: null}

export default createReducer(initialState, {
    [SIGN_IN]: (state, {payload: user}) => {
        console.log('sign in works')
        return {
            ...state,
            isLoggedIn: true,
            user: user,
        }
    },
    [LOG_OUT]: (state) => {
        return {
            ...state,
            isLoggedIn: false,
            user: null
        }
    },
    [UPDATE_PERMISSIONS]: (state, {payload: user}) => {
        const currentUser = state.user.id === user._id
        if (currentUser) {
            return {
                ...state,
                user: user
            }
        }
    },
    [UPDATE_LOGIN]: (state, {payload: user}) => {
        return {
            ...state,
            user: user
        }
    }
});