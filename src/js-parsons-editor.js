(function() {
  var ParsonsEditor = function(opts, exer) {
    this._editor = React.renderComponent(new ParsonsEditorComponent(exer || {}), opts.element);
  };
  ParsonsEditor.prototype.getExerciseConfig = function() {
    return this._editor.getExerciseConfig();
  };

  window.ParsonsEditor = ParsonsEditor;
}());