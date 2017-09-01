import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import ParsonsEditorComponent from 'jsx/ParsonsEditor';
import editorStore from 'reducers';
import {parseInitialConfig} from 'helpers';

class ParsonsEditor {
  constructor(opts, exer) {
    const props = Object.assign({}, opts, exer);
    this._store = createStore(
      editorStore,
      parseInitialConfig(props),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    render(
      <Provider store={this._store}>
        <ParsonsEditorComponent {...props} />
      </Provider>,
      opts.element
    );
  }

  getExerciseConfig() {
    return this._store.getState();
  }
}

export default ParsonsEditor;
window.ParsonsEditor = ParsonsEditor;
