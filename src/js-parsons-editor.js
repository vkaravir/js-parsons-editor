(function() {
  var ParsonsEditor = function(opts, exer) {
    var props = $.extend({}, opts, exer);
    this._editor = React.renderComponent(new ParsonsEditorComponent(props), opts.element);
  };
  ParsonsEditor.prototype.getExerciseConfig = function() {
    return this._editor.getExerciseConfig();
  };

  window.ParsonsEditor = ParsonsEditor;
}());