export const addTestCase = function() {
  return {
    type: 'EDITOR/VARIABLE_ADD_CASE'
  };
};

export const setProperty = function(index, name, value) {
  return {
    type: 'EDITOR/VARIABLE_SET_PROPERTY',
    payload: {
      index,
      name,
      value
    }
  };
};

export const addVariable = function(index) {
  return {
    type: 'EDITOR/VARIABLE_ADD_VARIABLE',
    payload: {
      index
    }
  };
};

export const setVariable = function(checkIndex, index, name, value, type) {
  return {
    type: 'EDITOR/VARIABLE_SET_VARIABLE',
    payload: {
      checkIndex,
      index,
      name,
      value,
      type
    }
  };
};

export default {
  addTestCase,
  addVariable,
  setProperty,
  setVariable,
};
