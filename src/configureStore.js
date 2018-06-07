import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import { reducer } from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware,
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}
