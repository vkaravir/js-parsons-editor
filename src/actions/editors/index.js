import turtleActions from './turtle';
import variableActions from './variable';

export const selectMode = function(mode) {
  return {
    type: 'EDITOR/SELECT_MODE',
    payload: mode
  };
};

export const setCodelines = function(codelines) {
  return {
    type: 'EDITOR/SET_CODELINES',
    payload: codelines
  };
};

export const setUnittests = function(unittests) {
  return {
    type: 'EDITOR/SET_UNITTESTS',
    payload: unittests
  };
};

export const setExecutableCode = function(code) {
  return {
    type: 'EDITOR/SET_EXECUTABLECODE',
    payload: code
  };
};

export const setProgrammingLang = function(lang) {
  return {
    type: 'EDITOR/SET_PROGRAMMINGLANG',
    payload: lang
  };
};

export default {
  selectMode,
  setCodelines,
  setUnittests,
  setExecutableCode,
  setProgrammingLang,
  turtle: turtleActions,
  variable: variableActions,
};
