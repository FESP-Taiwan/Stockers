// @flow

import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { createBrowserHistory } from 'history';
import {
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';

export const history = createBrowserHistory();

const store = createStore(combineReducers({
  form,
  router: connectRouter(history),
}), {}, compose(
  applyMiddleware(
    thunk,
    routerMiddleware(history),
  ),
));

export default store;
