const DEFAULT_LANGUAGE = 'python';

export default function (state = DEFAULT_LANGUAGE, action) {
  switch (action.type) {
    case 'EDITOR/SET_PROGRAMMINGLANG':
      return action.payload;
    default:
      return state;
  }
}
