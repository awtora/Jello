import {LOG_OUT, SIGN_IN, SIGN_UP, UPDATE_LOGIN, UPDATE_PERMISSIONS} from "./actionTypes";
import axios from "axios";
import {apiUrl} from "../../config";
import {clearBoards} from "./BoardActions";
import {setAlertWithTimeout} from "./AlertActions";
import authHeader from "../../helpers/AuthHeader";
//import {initBoards} from "./BoardActions";

export const signIn = (user) => ({
    type: SIGN_IN,
    payload: user
})

export const signUp = (user) => ({
    type: SIGN_UP,
    payload: user
})

export const updateLogin = (user) => ({
    type: UPDATE_LOGIN,
    payload: user
})

export const logOut = () => ({
    type: LOG_OUT
});

export const updatePermissions = (user) => ({
    type: UPDATE_PERMISSIONS,
    payload: user
})

export const postSignIn = ({login, password}) => {
    return dispatch => {
        axios.post(apiUrl + 'user/signIn', {
            data: {login, password}
        })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                dispatch(signIn(res.data.user))
            })
            .catch(err => {
                dispatch(setAlertWithTimeout(err.response.data.message))
            })
    }
}

export const postSignUp = ({login, password}) => {
    return dispatch => {
        axios.post(apiUrl + 'user/signUp', {
            data: {login, password}
        })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                dispatch(signIn(res.data.user))
            })
            .catch(err => dispatch(setAlertWithTimeout(err.response.data.message)))
    }
}

export const postChangePermission = (userId, boardId, permissionName, permissionValue) => {
    return dispatch => {
        axios.post(apiUrl + '/users/boardPermissions', {
            data: [userId, boardId, permissionName, permissionValue]
        }, {headers: authHeader()})
            .then(res => dispatch(updatePermissions(res.data.user)))
    }
}

export const postUpdateLogin = (userId, newLogin) => {
    return dispatch => {
        axios.post(apiUrl + 'user/editLogin', {
            data: [userId, newLogin]
        }, {
            headers: authHeader()
        })
            .then(res => {
                dispatch(updateLogin(res.data.user))
                dispatch(setAlertWithTimeout('Login was successfully changed'))
            })
    }
}

export const postUpdatePassword = (userId, newPassword) => {
    return dispatch => {
        axios.post(apiUrl+ 'user/editPassword', {
            data: [userId, newPassword]
        }, {
            headers: authHeader()
        })
            .then(res => dispatch(setAlertWithTimeout('Password was successfully changed')))
            .catch(err => dispatch(setAlertWithTimeout(err.response.data.message)))
    }
}

export const postLogOut = () => {
    return dispatch => {
        localStorage.removeItem('user');
        localStorage.removeItem('boards');
        Promise.all([
            dispatch(logOut()),
            dispatch(clearBoards())
        ])
    }
}