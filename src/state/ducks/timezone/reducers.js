import { combineReducers } from 'redux';
import createReducer from 'utils/createReducer';
import * as types from './types';

const timezone = createReducer(0)({
  [types.SET_TIMEZONE]: (state, action) => action.state,
});

export default combineReducers({
  timezone,
});
