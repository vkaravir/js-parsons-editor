export const togglePen = function() {
  return {
    type: 'EDITOR/TOGGLE_TURTLE_PEN'
  };
};

export const setTestCode = function(code) {
  return {
    type: 'EDITOR/SET_TURTLE_TESTCODE',
    payload: code
  };
};

export const setModelCode = function(code) {
  return {
    type: 'EDITOR/SET_TURTLE_MODELCODE',
    payload: code
  };
};

export default {
  togglePen,
  setTestCode,
  setModelCode,
};
