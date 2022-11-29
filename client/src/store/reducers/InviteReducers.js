import {createReducer} from "@reduxjs/toolkit";
import {DELETE_INVITE, INIT_INVITES, NEW_INVITE} from "../actions/actionTypes";

let initialState = {
    invites: []
}

export default createReducer(initialState, {
    [INIT_INVITES]: (state, {payload: invites}) => {
        return {
            ...state,
            invites: invites
        }
    },
    [NEW_INVITE]: (state, {payload: invite}) => {
        return {
            ...state,
            invites: [...state.invites, invite]
        }
    },
    [DELETE_INVITE]: (state, {payload: inviteId}) => {
        const index = state.invites.indexOf(state.invites.find((data) => data._id === inviteId));
        return {
            ...state,
            invites: [...state.invites.slice(0, index), ...state.invites.slice(index + 1, state.invites.length)],
        };
    }

})