import {DELETE_ALERT, SET_ALERT} from "./actionTypes";

export const setAlert = (message) => ({
    type: SET_ALERT,
    payload: message
})

export const deleteAlert = () => ({
    type: DELETE_ALERT
})

export const setAlertWithTimeout = (message, timeout=4000) => {
    return dispatch => {
        dispatch(setAlert(message));

        setTimeout(() => dispatch(deleteAlert()), timeout)
    }
}