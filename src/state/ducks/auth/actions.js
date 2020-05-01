import * as types from './types';

export const setSecret = (secret = '') => ({
  type: types.SET_SECRET,
  state: secret,
});

export const setLogged = (logged = false) => ({
  type: types.SET_LOGGED,
  state: logged,
});

export const setProvider = (provider = 'seva-auth') => ({
  type: types.SET_PROVIDER,
  state: provider,
});
