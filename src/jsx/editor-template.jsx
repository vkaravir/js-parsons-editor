/** @jsx React.DOM */
(function() {
  var ParsonsEditorComponent = React.createClass({
    getExerciseConfig: function() {
      var conf = {mode: this.state.mode, codelines: this.refs.codelineEditor.getConfig()};
      if (this.state.mode !== "line") {
        $.extend(conf, this.refs.executableEditor.getConfig(), this.refs.modeEditor.getConfig());
      }
      return conf;
    },
    _modeChange: function(evt) {
      var node = evt.target;
      while (node.nodeName.toLowerCase() !== "li") {
        node = node.parentNode;
      }
      this.setState({mode: node.dataset.type});
    },
    getInitialState: function() {
      return { mode: this.props.mode || "line"};
    },
    render: function() {
      var codelineEditor = new CodelineEditor({mode: this.state.mode,
                                                codelines: this.props.codelines,
                                                ref: "codelineEditor"}),
          executableEditor,
          modeEditor;
      if (this.state.mode === "var") {
        modeEditor = new VarCheckEditor({ref: "modeEditor"});
      } else if (this.state.mode === "unit") {
        modeEditor = new UnittestEditor({ref: "modeEditor", unittests: this.props.unittests});
      } else if (this.state.mode === "turtle") {
        modeEditor = new TurtleEditor({ref: "modeEditor"});
      }
      if (["var", "unit", "turtle"].indexOf(this.state.mode) !== -1) {
       executableEditor = new ExecutableEditor({ref: "executableEditor"});
      }
      return (
        <div className={"jsparsons-editor-container jsparsons-" + this.state.mode + "-editor"}>
          <h2>Select the type of grading</h2>
          <div className="jsparsons-mode-choice jsparsons-component-container">
            <ul>
              <li data-type="line" onClick={this._modeChange} className={(this.state.mode === "line")?"selected":""}>
                <span className={(this.state.mode === "line")?"fa fa-check fa-3x":""}></span>
                <h4>Line-based grading</h4>
                <p>Grading and feedback is based on the exact order and indentation of the lines of code.</p>
              </li>

              <li data-type="var" onClick={this._modeChange} className={(this.state.mode === "var")?"selected":""}>
                <span className={(this.state.mode === "var")?"fa fa-check fa-3x":""}></span>
                <h4>Variable Check grading</h4>
                <p>Grading and feedback is based on executing the student code, and then comparing variable
                  values to correct variable values.</p>
              </li>

              <li data-type="unit" onClick={this._modeChange} className={(this.state.mode === "unit")?"selected":""}>
                <span className={(this.state.mode === "unit")?"fa fa-check fa-3x":""}></span>
                <h4>Unit test grading</h4>
                <p>Grading and feedback is based on executing a set of unit tests on the student code.</p>
              </li>

              <li data-type="turtle" onClick={this._modeChange} className={(this.state.mode === "turtle")?"selected":""}>
                <span className={(this.state.mode === "turtle")?"fa fa-check fa-3x":""}></span>
                <h4>Turtle graphics grading</h4>
                <p>Grading and feedback is based on the path drawn by a turtle controlled by executing the student
                code. The path is compared to a path drawn by a model answer code.</p>
              </li>
            </ul>
          </div>
          <h2>Code fragments to construct solution from</h2>
          <div className="jsparsons-codelines-container jsparsons-component-container">
            {codelineEditor}
            {executableEditor}
          </div>
          {modeEditor}
        </div>
      )
    }
  });

  var CodelineEditor = React.createClass({
    getConfig: function() {
      return this.state.codelines.split("\n");
    },
    _codeChange: function(evt) {
      this.setState({codelines: evt.target.value});
    },
    getInitialState: function() {
      return {codelines: (this.props.codelines || []).join("\n")}
    },
    render: function() {
      var instructions = "Lines of code shown to student.";
      if (this.props.mode === "line") {
        instructions += "\nNote, that the order indicates the correct order and that two spaces at " +
                        " the beginning of a line indicates an " +
                        "indentation of one step.";
      }
      return (
        <div className="jsparsons-codelines jsparsons-component jsparsons-left">
          <p className="jsparsons-instructions">{instructions}</p>
          <textarea rows="10" onChange={this._codeChange}>{this.state.codelines}</textarea>
        </div>
      );
    }
  });

  var ExecutableEditor = React.createClass({
    _langChanged: function(evt) {
      this.setState({programmingLang: evt.target.value});
    },
    _codeChanged: function(evt) {
      this.setState({executableCode: evt.target.value});
    },
    getConfig: function() {
      if (this.state.programmingLang !== "python") {
        return { programmingLang: this.state.programmingLang,
                 executableCode: this.state.executableCode };
      } else {
        return {};
      }
    },
    getInitialState: function() {
      return {programmingLang: this.props.programmingLang || "python",
              executableCode: this.props.executableCode};
    },
    render: function() {
      return (
        <div className="jsparsons-executable-editor jsparsons-component jsparsons-right">
          <p className="jsparsons-instructions">Select a programming language:
            <select name="prog-lang" value={this.state.programmingLang} onChange={this._langChanged}>
              <option value="python">Python</option>
              <option value="pseudo">Pseudo</option>
              <option value="Java">Java</option>
              <option value="Other">Other</option>
            </select>
          </p>
          <textarea rows="10" disabled={this.state.programmingLang === "python"} className={"jsparsons-" + this.state.programmingLang}
                value={this.state.executableCode} onChange={this._codeChanged}>
          </textarea>
        </div>
      )
    }
  });

  var VarCheckEditor = React.createClass({
    getConfig: function() {
      var vartests = [];
      for (var i = 0; i < this.state.vartests.length; i++) {
        vartests.push(this.refs["varcheck" + i].getConfig());
      }
      return { vartests: vartests };
    },
    getInitialState: function() {
      return { vartests: this.props.vartests || [new VarCheckTest()] };
    },
    _addCheck: function() {
      var newvartests = this.state.vartests.concat([new VarCheckTest()]);
      this.setState({vartests: newvartests});
    },
    render: function() {
      var vartests = [];
      for (var i = 0; i < this.state.vartests.length; i++) {
        vartests.push(new VarCheckTest($.extend({ref: "varcheck" + i}, this.state.vartests[i])));
      }
      return (
        <div className="jsparsons-mode-editor">
          <h2><span className="fa fa-tasks"/>Varcheck-based</h2>
          <div className="jsparsons-var-editor">
            <table>
              <thead>
                <tr><th>Description</th><th>Code Before</th><th>Variable Checks</th><th>Code After</th></tr>
              </thead>
              <tbody>
              {vartests}
              </tbody>
            </table>
            <button onClick={this._addCheck}>Add testcase</button>
          </div>
        </div>
      )
    }
  });

  var VarCheckTest = React.createClass({
    getConfig: function() {
      var variables = {};
      for (var i = 0; i < this.state.variables.length; i++) {
        var vari = this.state.variables[i];
        variables[vari.key] = vari.value;
      }
      return { message: this.state.message,
               initCode: this.state.initCode,
               code: this.state.code,
               variables: variables };
    },
    getInitialState: function() {
      var variables = [];
      for (var name in this.props.variables) {
        variables.push({key: name, value: this.props.variables[name]});
      }
      return { message: this.props.message || "",
               variables: variables,
               initCode: this.props.initCode || "",
               code: this.props.code || "" };
    },
    _messageChanged: function(evt) {
      this.setState({message: evt.target.value});
    },
    _initCodeChanged: function(evt) {
      this.setState({initCode: evt.target.value});
    },
    _codeChanged: function(evt) {
      this.setState({code: evt.target.value});
    },
    _addVariable: function(evt) {
      var newVars = this.state.variables.concat([{key: "", value: ""}]);
      this.setState({variables: newVars});
    },
    _updateVariable: function(i, name, value) {
      this.state.variables[i].key = name;
      this.state.variables[i].value = value;
    },
    render: function() {
      var varchecks = [];
      for (var i = 0; i < this.state.variables.length; i++) {
        var vari = this.state.variables[i];
        varchecks.push(new VarCheck({key: "var" + i, value: vari.value, update: function(i, name, val) {
            this._updateVariable(i, name, val);
          }.bind(this)}));
      }
      return (
        <tr>
          <td><input type="text" value={this.state.message} onChange={this._messageChanged}/></td>
          <td>{varchecks}<div><button onClick={this._addVariable}>+</button></div></td>
          <td><input type="text" value={this.state.initCode} onChange={this._initCodeChanged}/></td>
          <td><input type="text" value={this.state.code} onChange={this._codeChanged}/></td>
        </tr>
      );
    }
  });

  var VarCheck = React.createClass({
    getInitialState: function() {
      return {varname: this.props.name, varvalue: this.props.value };
    },
    _nameChanged: function(evt) {
      this.setState({varname: evt.target.value});
      this.props.update(this.props.key.replace("var", ""), evt.target.value, this.state.varvalue);
    },
    _valueChanged: function(evt) {
      this.setState({varvalue: evt.target.value});
      this.props.update(this.props.key.replace("var", ""), this.state.varname, evt.target.value);
    },
    render: function() {
      return (
        <div>
          <input type="text" value={this.state.varname} onChange={this._nameChanged} placeholder="name"/>
          <input type="text" value={this.state.varvalue} onChange={this._valueChanged} placeholder="value"/>
        </div>
      )
    }
  });

  var DEFAULT_UNITTESTS = "# You should always import unittestparson\n" +
              "import unittestparson\n\n" +
              "# You can name your class whatever you like,\n" +
              "# but need to extend unittestparson.unittest\n" +
              "class MyTests(unittestparson.unittest):\n" +
              "  # You can define as many test functions as you like\n" +
              "  # The function name sould start with test\n" +
              "  def testAddition(self):\n" +
              "    # you can have as many assertions as you like,\n" +
              "    # parameters are (actual, expected, description)\n" +
              "    self.assertEqual(1 + 1, 2, 'Test description shown to student')\n\n" +
              "# Always end with calling main() of a new instance of your class, and\n" +
              "# Always assign results to _test_result\n" +
              "_test_result = MyTests().main()";

  var UnittestEditor = React.createClass({
    getConfig: function() {
      return {unittests: this.state.unittests};
    },
    getInitialState: function() {
      return { unittests: this.props.unittests || DEFAULT_UNITTESTS };
    },
    _testsChanged: function(evt) {
      this.setState({unittests: evt.target.value});
    },
    render: function() {
      return (
        <div className="jsparsons-mode-editor">
          <h2><span className="fa fa-check-circle"/>Unittest-based</h2>
          <div className="jsparsons-unit-editor jsparsons-component-container">
            <div className="jsparsons-component jsparsons-left">
              <textarea rows="10" value={this.state.unittests} onChange={this._testsChanged}></textarea>
            </div>
            <p className="jsparsons-component jsparsons-right">Instructions...</p>
          </div>
        </div>
      )
    }
  });

  var TurtleEditor = React.createClass({
    getConfig: function() {
      return { turtleTestCode: this.state.turtleTestCode,
              turtlePenDown: this.state.turtlePenDown,
              turtleModelCode: this.state.turtleModelCode };
    },
    getInitialState: function() {
      var initState = { turtleTestCode: this.props.turtleTestCode || "",
              turtleModelCode: this.props.turtleModelCode || ""};
      if (typeof this.props.turtlePenDown === "undefined") {
        initState.turtlePenDown = true;
      } else {
        initState.turtlePenDown = this.props.turtlePenDown;
      }
      return initState;
    },
    _modelCodeChanged: function(evt) {
      this.setState({turtleModelCode: evt.target.value});
    },
    _testCodeChanged: function(evt) {
      this.setState({turtleTestCode: evt.target.value});
    },
    _penChanged: function(evt) {
      this.setState({turtlePenDown: evt.target.checked});
    },
    render: function() {
      return (
        <div className="jsparsons-mode-editor">
          <h2><span className="fa fa-bug"/>Turtle-based</h2>
          <div className="jsparsons-turtle-editor jsparsons-component-container">
            <div className="jsparsons-turtle-model jsparsons-component jsparsons-left">
              <p className="jsparsons-instructions">Python code for the model turtle pattern (you can use variable <code>modelTurtle</code> to access the turtle object):</p>
              <textarea value={this.state.turtleModelCode} onChange={this._modelCodeChanged}></textarea>
              <input type="checkbox" checked={this.state.turtlePenDown} id="jsparsons-edit-turtlepen"
                    onChange={this._penChanged}/>
              <label htmlFor="jsparsons-edit-turtlepen">Is turtle pen down initially</label>
            </div>
            <div className="jsparsons-turtle-test jsparsons-component jsparsons-right">
              <p className="jsparsons-instructions">Python code to test the student solution which is added after the student code (use variable <code>myTurtle</code> to access the turtle object):</p>
              <textarea value={this.state.turtleTestCode} onChange={this._testCodeChanged}></textarea>
            </div>
          </div>
        </div>
      )
    }
  });
  window.ParsonsEditorComponent = ParsonsEditorComponent;
}());