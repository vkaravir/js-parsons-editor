export default function (state = '', action) {
  switch (action.type) {
    case 'EDITOR/SET_CODELINES':
      return action.payload;
    default:
      return state;
  }
}
