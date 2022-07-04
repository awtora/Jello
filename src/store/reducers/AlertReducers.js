import {createReducer} from "@reduxjs/toolkit";
import {DELETE_ALERT, SET_ALERT} from "../actions/actionTypes";

let initialState = {
    alertMessage: ""
}

export default createReducer(initialState, {
    [SET_ALERT]: (state, {payload: message}) => {
        return {
            ...state,
            alertMessage: message
        }
    },
    [DELETE_ALERT]: (state) => {
        return {
            ...state,
            alertMessage: ""
        }
    }
})