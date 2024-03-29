import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App.js';
import {Provider} from 'react-redux';
import store from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
