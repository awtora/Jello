import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BoardReducers, ListReducers, UserReducers, InviteReducers, AlertReducers} from './reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const reducers = combineReducers({listsStore: ListReducers, userStore: UserReducers, boardStore: BoardReducers, inviteStore: InviteReducers, alertStore: AlertReducers});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
