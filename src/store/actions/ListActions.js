import {
    CLEAR_ACTIVE_LISTS,
    DELETE_ITEM,
    DELETE_LIST,
    FETCH_ERROR,
    FETCH_PENDING,
    FETCH_SUCCESS,
    MOVE_CARD,
    NEW_ITEM,
    NEW_LIST,
    UPDATE_ITEM,
    UPDATE_LIST,
} from './actionTypes';
import axios from "axios";
import {apiUrl} from "../../config";
import authHeader from "../../helpers/AuthHeader";

export const newList = (list) => ({
    type: NEW_LIST,
    payload: list,
});

export const newItem = (list) => ({
    type: NEW_ITEM,
    payload: list,
});

export const deleteItem = (list) => ({
    type: DELETE_ITEM,
    payload: list,
});

export const updateItem = (list) => ({
    type: UPDATE_ITEM,
    payload: list,
});

export const updateList = (list) => ({
    type: UPDATE_LIST,
    payload: list
})

export const deleteList = (list) => ({
    type: DELETE_LIST,
    payload: list,
});

export const moveCard = (data) => ({
    type: MOVE_CARD,
    payload: data,
});

export const fetchPending = () => ({
    type: FETCH_PENDING,
});

export const fetchSuccess = (data) => ({
    type: FETCH_SUCCESS,
    payload: data,
});

export const fetchError = (err) => ({
    type: FETCH_ERROR,
    payload: err,
});

export const clearActiveLists = () => ({
    type: CLEAR_ACTIVE_LISTS
})

export const postDeleteItem = (listId, itemId) => {
    return (dispatch) => {
        axios
            .delete(apiUrl + 'items', {
                headers: authHeader(),
                data: [listId, itemId],
            })
            .then((res) => {
                dispatch(deleteItem(res.data.list));
            });
    };
};
export const postDeleteList = (boardId, listId) => {
    return (dispatch) => {
        axios
            .delete(apiUrl + 'lists', {
                headers: authHeader(),
                data: {boardId, listId},
            })
            .then((res) => {
                console.log(res.data.list)
                dispatch(deleteList(res.data.list))
            });
    };
};
export const postNewItem = ([listId, item]) => {
    return (dispatch) => {
        axios
            .post(apiUrl + 'items', {
                data: [listId, item],
            }, {
                headers: authHeader(),
            })
            .then((res) => {
                dispatch(newItem(res.data.list));
            });
    };
};
export const putUpdateItem = ([listId, itemId, item]) => {
    return (dispatch) => {
        axios
            .put(apiUrl + 'items', {
                data: [listId, itemId, item],
            }, {
                headers: authHeader(),
            })
            .then((res) => {
                dispatch(updateItem(res.data.list));
            });
    };
};
export const putUpdateListTitle = ([listId, title]) => {
    return dispatch => {
        axios.put(apiUrl + 'lists/title', {
            data: [listId, title],
        }, {
            headers: authHeader(),
        })
            .then((res) => dispatch(updateList(res.data.list)))
    }
}

export const putUpdateListItems = (listId, itemId, itemIndex) => {
    return dispatch => {
        axios.put(apiUrl + 'lists/items', {
            data: [listId, itemId, itemIndex],
        }, {
            headers: authHeader()
        })
            .then((res) => dispatch(updateList(res.data.list)))
    }
}

export const putMoveListItems = (listId, itemId, itemIndex) => {
    return dispatch => {
        axios.put(apiUrl + 'lists/move', {
            data: [listId, itemId, itemIndex]
        }, {
            headers: authHeader()
        })
            .then(res => dispatch(updateList(res.data.list)))
    }
}

export const postDeleteListItem = (listId, itemId) => {
    return dispatch => {
        axios.delete(apiUrl + 'lists/items', {
            headers: authHeader(),
            data: [listId, itemId]
        })
            .then(res => dispatch(updateList(res.data.list)))
    }

}

export const postNewList = (boardId, list) => {
    return (dispatch) => {
        axios
            .post(apiUrl + 'lists', {
                data: {boardId, list}
            }, {
                headers: authHeader(),
            })
            .then((res) => {
                dispatch(newList(res.data.list));
            });
    };
};
export const postMoveCard = (oldListId, newListId, itemId, itemIndex) => {
    return (dispatch) => {
        axios
            .post(apiUrl + 'lists/move', {
                data: [oldListId, newListId, itemId, itemIndex],
            }, {
                headers: authHeader(),
            })
            .then((res) => {
                dispatch(updateList(res.data[0]));
                dispatch(updateList(res.data[1]));
            });
    };
};
export const fetchBoardLists = (boardId) => {
    return (dispatch) => {
        //console.log(listIds)
        dispatch(fetchPending());
        axios
            .get(apiUrl + 'board/lists', {
                method: 'GET',
                headers: authHeader(),
                params: {boardId: boardId}
            })
            .then((res) => {
                console.log(res.data)
                dispatch(fetchSuccess(res.data));
            })
            .catch((err) => dispatch(fetchError(err)));
    };
};