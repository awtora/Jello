import {
    CLEAR_ACTIVE_LISTS,
    DELETE_ITEM,
    DELETE_LIST,
    FETCH_SUCCESS,
    MOVE_CARD,
    NEW_ITEM,
    NEW_LIST,
    UPDATE_ITEM, UPDATE_LIST,
} from '../actions/actionTypes';
import { createReducer } from '@reduxjs/toolkit';

let initialState = {
    isLoaded: false,
    lists: [],
};

const listMove = (state, list) => {
    const index = state.lists.indexOf(state.lists.find((data) => data._id === list._id));
    return {
        ...state,
        lists: [...state.lists.slice(0, index), list, ...state.lists.slice(index + 1, state.lists.length)],
    };
}

export default createReducer(initialState, {
    [FETCH_SUCCESS]: (state, { payload: lists }) => {
        return { ...state, lists: [...lists], isLoaded: true };
    },
    [NEW_LIST]: (state, { payload: list }) => {
        return { ...state, lists: [...state.lists, list] };
    },
    [NEW_ITEM]: (state, { payload: list }) => {
        return listMove(state, list);
    },
    [UPDATE_ITEM]: (state, { payload: list }) => {
        return listMove(state, list);
    },
    [DELETE_ITEM]: (state, { payload: list }) => {
        return listMove(state, list);
    },
    [UPDATE_LIST]: (state, { payload: list }) => {
        return listMove(state, list)
    },
    [DELETE_LIST]: (state, { payload: list }) => {
        const index = state.lists.indexOf(state.lists.find((data) => data._id === list._id));
        return {
            ...state,
            lists: [...state.lists.slice(0, index), ...state.lists.slice(index + 1, state.lists.length)],
        };
    },
    [CLEAR_ACTIVE_LISTS]: (state) => {
        return {
            ...state,
            lists: []
        }
    }
});
