import * as types from './types';

export const setTimezone = (timezone) => ({
  type: types.SET_TIMEZONE,
  state: timezone,
});
