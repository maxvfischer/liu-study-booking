import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Blipp from './components/containers/Blipp';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

const store = createStore(
    rootReducer
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store = { store }>
            <Route exact path='/' component = { Blipp } />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
