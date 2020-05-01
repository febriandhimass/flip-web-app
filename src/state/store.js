// redux
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

// storage and middlewares
import {
  persistStore,
  persistCombineReducers,
} from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import multi from 'redux-multi';

// all needed variables & params
import * as reducers from './ducks';
// import all reducers from ducks/index.js
const config = {
  key: `seva-admin-${process.env.NODE_ENV || 'local'}`,
  storage,
  debug: (process.env.NODE_ENV !== 'production'),
  blacklist: ['toastr'],
};

const configureStore = () => {
  // compile reducers
  const rootReducer = persistCombineReducers(config, reducers);

  // // compose
  const composeEnhancers = compose;

  // compile store
  const store = createStore(rootReducer, /* initialState */ composeEnhancers(
    applyMiddleware(thunk, multi),
  ));

  // return
  return {
    persistor: persistStore(store),
    store,
  };
};

const store = configureStore();
export default store;
