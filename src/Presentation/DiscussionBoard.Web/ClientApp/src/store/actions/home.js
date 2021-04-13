import {
  SET_HOME_SORT,
  SET_HOME_TOP
} from './actionTypes';

export const setHomeSort = (sort) => {
  return {
    type: SET_HOME_SORT,
    sort: sort,
  };
};

export const setHomeTop = (top) => {
  return {
    type: SET_HOME_TOP,
    top: top,
  };
};