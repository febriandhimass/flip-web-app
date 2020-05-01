import { combineReducers } from 'redux';
import createReducer from 'utils/createReducer';
import * as types from './types';

const secret = createReducer(null)({
  [types.SET_SECRET]: (state, action) => action.state,
});

const logged = createReducer(false)({
  [types.SET_LOGGED]: (state, action) => action.state,
});

const provider = createReducer('seva-auth')({
  [types.SET_PROVIDER]: (state, action) => action.state,
});

export default combineReducers({
  secret,
  logged,
  provider,
});
