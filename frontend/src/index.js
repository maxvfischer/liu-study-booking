import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Blipp from './components/containers/Blipp';
import RequireBlipp from './components/containers/RequireBlipp';
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
                <Route path='/booking' component = { RequireBlipp } />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
