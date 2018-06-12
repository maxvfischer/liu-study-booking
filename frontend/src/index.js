import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Blipp from './components/containers/Blipp';
import Booking from './components/containers/Booking';
import registerServiceWorker from './registerServiceWorker';

import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store = { store }>
            <Switch>
                <Route exact path='/' component = { Blipp } />
                <Route path='/booking' component = { Booking } />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
