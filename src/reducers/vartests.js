const DEFAULT_VARIABLE = {name: '', value: '', type: 'string'};
const createNewVariable = () => Object.assign({}, DEFAULT_VARIABLE);

const DEFAULT_VARTEST =  {
  message: '',
  variables: [createNewVariable()],
  initcode: '',
  code: '',
};
const createNewVartest = () => Object.assign({}, DEFAULT_VARTEST);

const updateProperty = (payload, varChecks) => {
  return varChecks.map((check, index) => {
    if (index === payload.index) {
      return {
        ...check,
        [payload.name]: payload.value
      };
    }
    return check;
  });
};

const updateCheckVariable = (payload, variables) => {
  return variables.map((variable, index) => {
    if (index === payload.index) {
      return {
        name: payload.name,
        value: payload.value,
        type: payload.type
      };
    }
    return variable;
  });
};

const updateVariable = (payload, varChecks) => {
  return varChecks.map((check, index) => {
    if (index === payload.checkIndex) {
      return {
        ...check,
        variables: updateCheckVariable(payload, check.variables)
      };
    }
    return check;
  });
};

const addVariable = (payload, varChecks) => {
  return varChecks.map((check, index) => {
    if (index === payload.index) {
      return {
        ...check,
        variables: check.variables.concat(createNewVariable())
      };
    }
    return check;
  });
};

export default function (state = [createNewVartest()], action) {
  switch (action.type) {
    case 'EDITOR/VARIABLE_ADD_CASE':
      return state.concat(createNewVartest());
    case 'EDITOR/VARIABLE_SET_PROPERTY':
      return updateProperty(action.payload, state);
    case 'EDITOR/VARIABLE_ADD_VARIABLE':
      return addVariable(action.payload, state);
    case 'EDITOR/VARIABLE_SET_VARIABLE':
      return updateVariable(action.payload, state);
    default:
      return state;
  }
}
