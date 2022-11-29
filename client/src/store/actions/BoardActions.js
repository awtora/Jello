import {
    CLEAR_ACTIVE_BOARD,
    CLEAR_BOARDS,
    SET_ACTIVE_BOARD,
    INIT_BOARDS,
    NEW_BOARD,
    UPDATE_BOARD,
    DELETE_BOARD
} from "./actionTypes";
import axios from "axios";
import {apiUrl} from "../../config";
import authHeader from "../../helpers/AuthHeader";

export const initBoards = (boards) => ({
    type: INIT_BOARDS,
    payload: boards
})

export const setActiveBoard = (boardId) => ({
    type: SET_ACTIVE_BOARD,
    payload: boardId
})

export const clearBoards = () => ({
    type: CLEAR_BOARDS,
})

export const clearActiveBoard = () => ({
    type: CLEAR_ACTIVE_BOARD
})

export const newBoard = (board) => ({
    type: NEW_BOARD,
    payload: board,
})

export const updateBoard = (board) => ({
    type: UPDATE_BOARD,
    payload: board
})

export const deleteBoard = (board) => ({
    type: DELETE_BOARD,
    payload: board
})

export const putUpdateBoardName = (boardId, newName) => {
    return dispatch => {
        axios.put(apiUrl+'/board', {
            data: [boardId, newName],
        }, {
            headers: authHeader()
        })
            .then(res => dispatch(updateBoard(res.data.board)))
    }
}

export const getUserBoards = (userId) => {
    return dispatch => {
        axios.get(apiUrl + 'user/boards', {
            headers: authHeader(),
            params: {
                userId: userId
            }
        })
            .then(res => dispatch(initBoards(res.data.boards)))
    }
}

export const postNewBoard = (name, creatorId) => {
    return dispatch => {
        axios.post(apiUrl+'/boards', {
            data: {name, creatorId}
        }, {
            headers: authHeader()
        })
            .then(res => dispatch(newBoard(res.data.board)))
    }
}

export const postDeleteBoard = (boardId) => {
    return dispatch => {
        axios.delete(apiUrl + '/board', {
            headers: authHeader(),
            data: {boardId},
        })
            .then(res => {
                console.log(res.data.board)
                dispatch(deleteBoard(res.data.board))
            })
    }
}