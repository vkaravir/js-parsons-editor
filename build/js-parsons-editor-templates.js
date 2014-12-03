/** @jsx React.DOM */
(function() {
  var ParsonsEditorComponent = React.createClass({displayName: 'ParsonsEditorComponent',
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
        modeEditor = new VarCheckEditor({ref: "modeEditor", vartests: this.props.vartests});
      } else if (this.state.mode === "unit") {
        modeEditor = new UnittestEditor({ref: "modeEditor", unittests: this.props.unittests});
      } else if (this.state.mode === "turtle") {
        // create turtle mode editor
        modeEditor = new TurtleEditor({ref: "modeEditor", turtleModelCode: this.props.turtleModelCode,
                                      turtlePenDown: this.props.turtlePenDown,
                                      turtleTestCode: this.props.turtleTestCode});
      }
      if (["var", "unit", "turtle"].indexOf(this.state.mode) !== -1) {
       executableEditor = new ExecutableEditor({ref: "executableEditor", programmingLang: this.props.programmingLang,
                                                executableCode: this.props.executableCode});
      }
      var testButton;
      if (window.ParsonsWidget) {
        testButton = new TestButton({editor: this});
      }
      return (
        React.DOM.div({className: "jsparsons-editor-container jsparsons-" + this.state.mode + "-editor"}, 
          React.DOM.h2(null, "Select the type of grading"), 
          React.DOM.div({className: "jsparsons-mode-choice jsparsons-component-container"}, 
            React.DOM.ul(null, 
              React.DOM.li({'data-type': "line", onClick: this._modeChange, className: (this.state.mode === "line")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "line")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, "Line-based grading"), 
                React.DOM.p(null, "Grading and feedback is based on the exact order and indentation of the lines of code.")
              ), 

              React.DOM.li({'data-type': "var", onClick: this._modeChange, className: (this.state.mode === "var")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "var")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, "Variable Check grading"), 
                React.DOM.p(null, "Grading and feedback is based on executing the student code, and then comparing variable" + ' ' +
                  "values to correct variable values.")
              ), 

              React.DOM.li({'data-type': "unit", onClick: this._modeChange, className: (this.state.mode === "unit")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "unit")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, "Unit test grading"), 
                React.DOM.p(null, "Grading and feedback is based on executing a set of unit tests on the student code.")
              ), 

              React.DOM.li({'data-type': "turtle", onClick: this._modeChange, className: (this.state.mode === "turtle")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "turtle")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, "Turtle graphics grading"), 
                React.DOM.p(null, "Grading and feedback is based on the path drawn by a turtle controlled by executing the student" + ' ' +
                "code. The path is compared to a path drawn by a model answer code.")
              )
            )
          ), 
          React.DOM.h2(null, "Code fragments to construct solution from"), 
          React.DOM.div({className: "jsparsons-codelines-container jsparsons-component-container"}, 
            codelineEditor, 
            executableEditor
          ), 
          modeEditor, 
          testButton
        )
      )
    }
  });

  var CodelineEditor = React.createClass({displayName: 'CodelineEditor',
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
        React.DOM.div({className: "jsparsons-codelines jsparsons-component jsparsons-left"}, 
          React.DOM.p({className: "jsparsons-instructions"}, instructions), 
          React.DOM.textarea({rows: "10", onChange: this._codeChange}, this.state.codelines)
        )
      );
    }
  });

  var ExecutableEditor = React.createClass({displayName: 'ExecutableEditor',
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
        React.DOM.div({className: "jsparsons-executable-editor jsparsons-component jsparsons-right"}, 
          React.DOM.p({className: "jsparsons-instructions"}, "Select a programming language:", 
            React.DOM.select({name: "prog-lang", value: this.state.programmingLang, onChange: this._langChanged}, 
              React.DOM.option({value: "python"}, "Python"), 
              React.DOM.option({value: "pseudo"}, "Pseudo"), 
              React.DOM.option({value: "java"}, "Java"), 
              React.DOM.option({value: "other"}, "Other")
            )
          ), 
          React.DOM.textarea({rows: "10", disabled: this.state.programmingLang === "python", className: "jsparsons-" + this.state.programmingLang, 
                value: this.state.executableCode, onChange: this._codeChanged}
          )
        )
      )
    }
  });

  var VarCheckEditor = React.createClass({displayName: 'VarCheckEditor',
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
        React.DOM.div({className: "jsparsons-mode-editor"}, 
          React.DOM.h2(null, React.DOM.span({className: "fa fa-tasks"}), "Variable check configuration"), 
          React.DOM.div({className: "jsparsons-var-editor"}, 
            React.DOM.table(null, 
              React.DOM.thead(null, 
                React.DOM.tr(null, React.DOM.th(null, "Description"), React.DOM.th(null, "Code Before"), React.DOM.th(null, "Code After"), React.DOM.th(null, "Variable Checks"))
              ), 
              React.DOM.tbody(null, 
              vartests
              )
            ), 
            React.DOM.button({onClick: this._addCheck}, "Add testcase")
          )
        )
      )
    }
  });

  var VarCheckTest = React.createClass({displayName: 'VarCheckTest',
    getConfig: function() {
      var variables = {};
      for (var i = 0; i < this.state.variables.length; i++) {
        var vari = this.state.variables[i];
        variables[vari.key] = vari.value;
      }
      return { message: this.state.message,
               initcode: this.state.initcode,
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
               initcode: this.props.initcode || "",
               code: this.props.code || "" };
    },
    _messageChanged: function(evt) {
      this.setState({message: evt.target.value});
    },
    _initCodeChanged: function(evt) {
      this.setState({initcode: evt.target.value});
    },
    _codeChanged: function(evt) {
      this.setState({code: evt.target.value});
    },
    _addVariable: function(evt) {
      var newVars = this.state.variables.concat([{key: "", value: ""}]);
      this.setState({variables: newVars});
    },
    _updateVariable: function(i, name, value, valtype) {
      this.state.variables[i].key = name;
      var newVal;
      if (valtype === "boolean") {
        newVal = (value==="true"?true:false);
      } else if (valtype === "int") {
        newVal = parseInt(value, 10);
      } else if (valtype === "decimal") {
        newVal = parseFloat(value, 10);
      } else {
        newVal = "" + value;
      }
      this.state.variables[i].value = newVal;
    },
    render: function() {
      var varchecks = [];
      for (var i = 0; i < this.state.variables.length; i++) {
        var vari = this.state.variables[i];
        varchecks.push(new VarCheck({key: "var" + i, name: vari.key, value: vari.value, update: function(i, name, val, valtype) {
            this._updateVariable(i, name, val, valtype);
          }.bind(this)}));
      }
      return (
        React.DOM.tr(null, 
          React.DOM.td(null, React.DOM.input({type: "text", value: this.state.message, onChange: this._messageChanged})), 
          React.DOM.td(null, React.DOM.textarea({type: "text", value: this.state.initcode, onChange: this._initCodeChanged})), 
          React.DOM.td(null, React.DOM.textarea({type: "text", value: this.state.code, onChange: this._codeChanged})), 
          React.DOM.td({className: "jsparsons-varchecks"}, varchecks, React.DOM.div(null, React.DOM.button({onClick: this._addVariable}, "+")))
        )
      );
    }
  });

  var VarCheck = React.createClass({displayName: 'VarCheck',
    getInitialState: function() {
      // handle the type of the variable value
      // if it's a number, try to convert to integer and then decimal
      // everything else is treated as a string
      var varvalue = this.props.value,
          vartype = typeof varvalue;
      if (vartype === "number") {
        if ("" + parseInt(varvalue, 10) == varvalue) {
          vartype = "int";
        } else {
          vartype = "decimal";
        }
      } else if (vartype === "boolean") {
        // nothing to do
      } else { // force everything into a string
        vartype = "string";
      }
      return {varname: this.props.name, varvalue: varvalue, vartype: vartype || "string" };
    },
    _nameChanged: function(evt) {
      this.setState({varname: evt.target.value});
      this.props.update(this.props.key.replace("var", ""), evt.target.value, this.state.varvalue, this.state.vartype);
    },
    _valueChanged: function(evt) {
      this.setState({varvalue: evt.target.value});
      this.props.update(this.props.key.replace("var", ""), this.state.varname, evt.target.value, this.state.vartype);
    },
    _typeChanged: function(evt) {
      this.setState({vartype: evt.target.value});
      this.props.update(this.props.key.replace("var", ""), this.state.varname, this.state.varvalue, evt.target.value);
    },
    render: function() {
      return (
        React.DOM.div(null, 
          React.DOM.input({type: "text", value: this.state.varname, onChange: this._nameChanged, placeholder: "name"}), 
          React.DOM.input({type: "text", value: this.state.varvalue, onChange: this._valueChanged, placeholder: "value"}), 
          React.DOM.select({value: this.state.vartype, onChange: this._typeChanged}, 
            React.DOM.option({value: "int"}, "Integer"), 
            React.DOM.option({value: "decimal"}, "Decimal"), 
            React.DOM.option({value: "boolean"}, "Boolean"), 
            React.DOM.option({value: "string"}, "String")
          )
        )
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

  var UnittestEditor = React.createClass({displayName: 'UnittestEditor',
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
        React.DOM.div({className: "jsparsons-mode-editor"}, 
          React.DOM.h2(null, React.DOM.span({className: "fa fa-check-circle"}), "Unit tests"), 
          React.DOM.div({className: "jsparsons-unit-editor jsparsons-component-container"}, 
            React.DOM.div({className: "jsparsons-component jsparsons-left"}, 
              React.DOM.textarea({rows: "10", value: this.state.unittests, onChange: this._testsChanged})
            ), 
            React.DOM.p({className: "jsparsons-component jsparsons-right"}, "Instructions...")
          )
        )
      )
    }
  });

  var TurtleEditor = React.createClass({displayName: 'TurtleEditor',
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
        React.DOM.div({className: "jsparsons-mode-editor"}, 
          React.DOM.h2(null, React.DOM.span({className: "fa fa-bug"}), "Turtle configuration"), 
          React.DOM.div({className: "jsparsons-turtle-editor jsparsons-component-container"}, 
            React.DOM.div({className: "jsparsons-turtle-model jsparsons-component jsparsons-left"}, 
              React.DOM.p({className: "jsparsons-instructions"}, "Python code for the model turtle pattern (you can use variable ", React.DOM.code(null, "modelTurtle"), " to access the turtle object):"), 
              React.DOM.textarea({value: this.state.turtleModelCode, onChange: this._modelCodeChanged}), 
              React.DOM.input({type: "checkbox", checked: this.state.turtlePenDown, id: "jsparsons-edit-turtlepen", 
                    onChange: this._penChanged}), 
              React.DOM.label({htmlFor: "jsparsons-edit-turtlepen"}, "Is turtle pen down initially")
            ), 
            React.DOM.div({className: "jsparsons-turtle-test jsparsons-component jsparsons-right"}, 
              React.DOM.p({className: "jsparsons-instructions"}, "Python code to test the student solution which is added after the student code (use variable ", React.DOM.code(null, "myTurtle"), " to access the turtle object):"), 
              React.DOM.textarea({value: this.state.turtleTestCode, onChange: this._testCodeChanged})
            )
          )
        )
      )
    }
  });

  var TestButton = React.createClass({displayName: 'TestButton',
    testWidget: function() {
      var opts = this.props.editor.getExerciseConfig();
      var parson = new ParsonsWidget($.extend({
          'sortableId': 'jsparsons-preview-target',
          'trashId': 'jsparsons-preview-source'
      }, opts));
      parson.init(opts.codelines.join('\n'));
      parson.shuffleLines();
      this.setState({visible: true, parson: parson});
    },
    getInitialState: function() {
      return {visible: false, feedback: ""};
    },
    _close: function() {
      this.setState({visible: false, feedback: ""});
    },
    _resetWidget: function() {
      this.state.parson.shuffleLines();
      this.setState({feedback: ""});
    },
    _showWidgetFeedback: function() {
      var fb = this.state.parson.getFeedback();
      if (fb.length) {
        this.setState({feedback: fb.join('\n')});
      } else if (fb.feedback) {
        this.setState({feedback: "<h2>Feedback from testing your program:</h2>" + fb.feedback});
      } else {
        this.setState({feedback: "Good, you solved the assignment!"});
      }
    },
    render: function() {
      return (
        React.DOM.div(null, 
          React.DOM.div({className: (this.state.visible?"visible ":"") + "jsparsons-preview"}, 
            React.DOM.button({onClick: this._close}, React.DOM.span({className: "fa fa-close fa-2x"}), "Close"), 
            React.DOM.h3(null, "Parsons Problem Preview"), 
            React.DOM.div({className: "jsparsons-container"}, 
              React.DOM.div({id: "jsparsons-preview-source", className: "sortable-code jsparsons-source"}), 
              React.DOM.div({id: "jsparsons-preview-target", className: "sortable-code jsparsons-target"})
            ), 
            React.DOM.div({className: "jsparsons-container"}, 
              React.DOM.div({onClick: this._resetWidget}, "Reset"), 
              React.DOM.div({onClick: this._showWidgetFeedback}, "Feedback")
            ), 
            React.DOM.div({className: "jsparsons-feedback", dangerouslySetInnerHTML: {__html:this.state.feedback}})
          ), 
          React.DOM.div({className: "jsparsons-test-button", onClick: this.testWidget}, "Test you configuration")
        )
      );
    }
  });

  window.ParsonsEditorComponent = ParsonsEditorComponent;
}());