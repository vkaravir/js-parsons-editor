export default function (state = '', action) {
  switch (action.type) {
    case 'EDITOR/SET_EXECUTABLECODE':
      return action.payload;
    default:
      return state;
  }
}
