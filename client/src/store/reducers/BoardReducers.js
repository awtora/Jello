import {createReducer} from "@reduxjs/toolkit";
import {
    CLEAR_ACTIVE_BOARD,
    CLEAR_BOARDS, DELETE_BOARD,
    INIT_BOARDS,
    NEW_BOARD,
    SET_ACTIVE_BOARD,
    UPDATE_BOARD
} from "../actions/actionTypes";

let initialState = {boards: [], activeBoard: null}

export default createReducer(initialState, {
    [INIT_BOARDS]: (state, {payload: boards}) => {
        return {
            ...state,
            boards: boards
        }
    },
    [SET_ACTIVE_BOARD]: (state, {payload: boardId}) => {
        console.log('hello')
        const board = state.boards.find(board => board._id === boardId)
        return {
            ...state,
            activeBoard: board
        }
    },
    [CLEAR_ACTIVE_BOARD]: (state) => {
        return {
            ...state,
            activeBoard: null
        }
    },
    [CLEAR_BOARDS]: (state) => {
        return {
            ...state,
            boards: []
        }
    },
    [NEW_BOARD]: (state, {payload: board}) => {
        return {
            ...state,
            boards: [...state.boards, board]
        }
    },
    [UPDATE_BOARD]: (state, {payload: board}) => {
        const index = state.boards.indexOf(state.boards.find((data) => data._id === board._id))
        return {
            ...state,
            boards: [...state.boards.slice(0, index), board, ...state.boards.slice(index + 1, state.boards.length)]
        }
    },
    [DELETE_BOARD]: (state, {payload: board}) => {
        const index = state.boards.indexOf(state.boards.find((data) => data._id === board._id));
        return {
            ...state,
            boards: [...state.boards.slice(0, index), ...state.boards.slice(index + 1, state.boards.length)],
        };
    }
})