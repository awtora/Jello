import axios from "axios";
import {apiUrl} from "../../config";
import authHeader from "../../helpers/AuthHeader";
import {DELETE_INVITE, INIT_INVITES, NEW_INVITE} from "./actionTypes";
import {initBoards, newBoard} from "./BoardActions";
import {setAlertWithTimeout} from "./AlertActions";

export const initInvites = (invites) => ({
    type: INIT_INVITES,
    payload: invites
})

export const newInvite = (invite) => ({
    type: NEW_INVITE,
    payload: invite
})

export const deleteInvite = (invite) => ({
    type: DELETE_INVITE,
    payload: invite
})

export const getInvites = (userId) => {
    return dispatch => {
        axios.get(apiUrl + 'invites', {
            headers: authHeader(),
            params: {
                userId: userId
            }
        })
            .then(res => {
                console.log(res.data)
                dispatch(initInvites(res.data.invites))
            })
    }
}

export const postInviteUser = (invite) => {
    return dispatch => {
        axios.post(apiUrl + 'invites', {
            data: invite
        }, {
            headers: authHeader()
        })
            .then(res => dispatch(setAlertWithTimeout('User was successfully invited')))
            .catch(err => dispatch(setAlertWithTimeout(err.response.data.message)))
    }
}

export const postAcceptInvite = (userId, boardId, inviteId) => {
    return dispatch => {
        axios.post(apiUrl + '/invites/accept', {
            data: {userId, boardId, inviteId}
        }, {
            headers: authHeader()
        })
            .then(res => {
                dispatch(initBoards(res.data.boards))
                dispatch(deleteInvite(inviteId))
            })
    }
}

export const postDeclineInvite = (inviteId) => {
    return dispatch => {
        axios.delete(apiUrl + '/invites', {
            headers: authHeader(),
            data: {inviteId}
        })
            .then(res => dispatch(deleteInvite(res.data.invite._id)))
            //.catch(err => dispatch(setAlertWithTimeout(err.response.data.message)))
    }
}