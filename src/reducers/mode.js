const INITIAL_MODE = 'line';

export default function (state = INITIAL_MODE, action) {
  switch (action.type) {
    case 'EDITOR/SELECT_MODE':
      return action.payload;
    default:
      return state;
  }
}
