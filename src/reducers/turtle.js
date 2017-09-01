const INITIAL_STATE = {
  testCode: '',
  modelCode: '',
  penDown: true
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'EDITOR/TOGGLE_TURTLE_PEN':
      return {
        ...state,
        penDown: !state.penDown
      };
    case 'EDITOR/SET_TURTLE_TESTCODE':
      return {
        ...state,
        testCode: action.payload
      };
    case 'EDITOR/SET_TURTLE_MODELCODE':
      return {
        ...state,
        modelCode: action.payload
      };
    default:
      return state;
  }
}
