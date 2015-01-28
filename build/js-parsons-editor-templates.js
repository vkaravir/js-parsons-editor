/** @jsx React.DOM */
(function() {

  var TRANSLATIONS = {
    "en": {
      GRADING_TYPE: "Select the type of grading",
      LINE_GRADING: "Line-based grading",
      VAR_GRADING: "Variable Check grading",
      UNITTEST_GRADING: "Unit test grading",
      TURTLE_GRADING: "Turtle graphics grading",
      LINE_GRADING_DESC: "Grading and feedback is based on the exact order and indentation of the lines of code.",
      VAR_GRADING_DESC: "Grading and feedback is based on executing the student code, and then comparing variable values to correct variable values.",
      UNITTEST_GRADING_DESC: "Grading and feedback is based on executing a set of unit tests on the student code.",
      TURTLE_GRADING_DESC: "Grading and feedback is based on the path drawn by a turtle controlled by executing the student code. The path is compared to a path drawn by a model answer code.",
      CODELINES: "Code fragments to construct solution from",
      SELECT_LANG: "Select a programming language:",
      OTHER_LANG: "Other",
      VAR_CHECK_CONF: "Variable check configuration",
      LINES_TO_SHOW: "Lines of code shown to student.",
      LINES_INSTRUCTIONS: "Note, that the order indicates the correct order and that two spaces at the beginning of a line indicates an indentation of one step.",
      VAR_DESCRIPTION: "Description of the testcase",
      VAR_CODE_BEFORE: "Code before",
      VAR_CODE_AFTER: "Code after",
      VAR_CHECKS: "Variable Checks",
      ADD_TESTCASE: "Add testcase",
      TYPE_INT: "Integer",
      TYPE_DECIMAL: "Decimal",
      TYPE_BOOLEAN: "Boolean",
      TYPE_STRING: "String",
      NAME: "Variable name",
      TURTLE_CONF: "Turtle configuration",
      TURTLE_MODEL_INSTR: "Python code for the model turtle pattern (you can use variable modelTurtle to access the turtle object):",
      TURTLE_PENDOWN: "Is turtle pen down initially",
      TURTLE_CODE_AFTER_INSTR: "Python code to test the student solution which is added after the student code (use variable myTurtle to access the turtle object)",
      PREVIEW_TITLE: "Parsons Problem Preview",
      RESET: "Reset",
      FEEDBACK: "Feedback",
      TEST_BUTTON: "Test your configuration",
      CLOSE: "Close",
      FEEDBACK_TITLE: "Feedback from testing your program:",
      SOLVED_FEEDBACK: "Good, you solved the assignment!"
    },
    "fi": {
      GRADING_TYPE: "Valitse arvostelutapa",
      LINE_GRADING: "Rivipohjainen arvostelu",
      VAR_GRADING: "Muuttujien vertailu",
      UNITTEST_GRADING: "Yksikkötestaus",
      TURTLE_GRADING: "Kilpikonnagrafiikka",
      LINE_GRADING_DESC: "Arvostelu ja palaute perustuvat koodirivien järjestykseen ja sisennykseen.",
      VAR_GRADING_DESC: "Arvostelu ja palaute perustuvat opiskelijan ohjelman suoritukseen ja muuttujien arvojen vertailuun suorituksen jälkeen.",
      UNITTEST_GRADING_DESC: "Arvostelu ja palaute perustuvat yksikkötestien ajamiseen opiskelijan ohjelmalle.",
      TURTLE_GRADING_DESC: "Arvostelu ja palaute perustuvat kilpikonnan piirtämään polkuun opiskelijan ohjelmaa suoritettaessa. Polkua verrataan mallivastauksen piirtämään polkuun.",
      CODELINES: "Koodirivit, joista vastaus rakennetaan",
      SELECT_LANG: "Valitse ohjelmointikieli:",
      OTHER_LANG: "Muu",
      VAR_CHECK_CONF: "Muuttujien vertailun asetukset",
      LINES_TO_SHOW: "Opiskelijalle näytettävät koodirivit.",
      LINES_INSTRUCTIONS: "Huomaa, että rivien järjestys määrää oikean ratkaisun. Rivien sisennyksen voi määrätä välilyönneillä.",
      VAR_DESCRIPTION: "Testitapauksen kuvaus",
      VAR_CODE_BEFORE: "Koodi ennen",
      VAR_CODE_AFTER: "Koodi jälkeen",
      VAR_CHECKS: "Muuttujien vertailut",
      ADD_TESTCASE: "Lisää testitapaus",
      TYPE_INT: "Kokonaisluku",
      TYPE_DECIMAL: "Desimaaliluku",
      TYPE_BOOLEAN: "Totuusarvo",
      TYPE_STRING: "Merkkijono",
      NAME: "Muuttujan nimi",
      TURTLE_CONF: "Kilpikonna-asetukset",
      TURTLE_MODEL_INSTR: "Python-koodi, joka piirtää kilpikonnan mallipolun (kilpikonna on muuttujassa modelTurtle):",
      TURTLE_PENDOWN: "Kilpikonnan kynä alhalla ohjelman alussa",
      TURTLE_CODE_AFTER_INSTR: "Python-koodi joka suoritetaan opiskelijan ohjelman jälkeen (kilpikonna on muuttujassa myTurtle)",
      PREVIEW_TITLE: "Tehtävän esikatselu",
      RESET: "Aloita alusta",
      FEEDBACK: "Palaute",
      TEST_BUTTON: "Kokeile tehtävääsi",
      CLOSE: "Sulje",
      FEEDBACK_TITLE: "Palaute ohjelmasi testauksesta:",
      SOLVED_FEEDBACK: "Hienoa, ratkaisit tehtävän!"
    }
  };
  var getTranslator = function(lang) {
    if (!lang || !TRANSLATIONS[lang]) {
      lang = "en"
    }
    var trans = TRANSLATIONS[lang];
    return function(key) {
      return trans[key] || key.toUpperCase();
    }
  };

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
      this.props.onchange();
    },
    componentWillMount: function() {
      if (!(typeof this.props.onchange === "function")) {
        this.props.onchange = function() {};
      }
    },
    getInitialState: function() {
      return { mode: this.props.mode || "line"};
    },
    render: function() {
      var translator = getTranslator(this.props.language),
          codelineEditor = new CodelineEditor({mode: this.state.mode,
                                                codelines: this.props.codelines,
                                                ref: "codelineEditor", _: translator,
                                                onchange: this.props.onchange}),
          executableEditor,
          modeEditor;

      if (this.state.mode === "var") {
        modeEditor = new VarCheckEditor({ref: "modeEditor", vartests: this.props.vartests,
                                        _: translator, onchange: this.props.onchange});
      } else if (this.state.mode === "unit") {
        modeEditor = new UnittestEditor({ref: "modeEditor", unittests: this.props.unittests,
                                        _: translator, onchange: this.props.onchange});
      } else if (this.state.mode === "turtle") {
        // create turtle mode editor
        modeEditor = new TurtleEditor({ref: "modeEditor", turtleModelCode: this.props.turtleModelCode,
                                      turtlePenDown: this.props.turtlePenDown,
                                      turtleTestCode: this.props.turtleTestCode,
                                      _: translator, onchange: this.props.onchange});
      }
      if (["var", "unit", "turtle"].indexOf(this.state.mode) !== -1) {
       executableEditor = new ExecutableEditor({ref: "executableEditor", programmingLang: this.props.programmingLang,
                                                executableCode: this.props.executableCode,
                                                _: translator, onchange: this.props.onchange});
      }
      var testButton;
      if (window.ParsonsWidget) {
        testButton = new TestButton({editor: this, _: translator, language: this.props.language, onchange: this.props.onchange});
      }
      var _ = translator;
      return (
        React.DOM.div({className: "jsparsons-editor-container jsparsons-" + this.state.mode + "-editor jsparsons-" + this.props.language}, 
          React.DOM.h2(null, _("GRADING_TYPE")), 
          React.DOM.div({className: "jsparsons-mode-choice jsparsons-component-container"}, 
            React.DOM.ul(null, 
              React.DOM.li({'data-type': "line", onClick: this._modeChange, className: (this.state.mode === "line")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "line")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, _("LINE_GRADING")), 
                React.DOM.p(null, _("LINE_GRADING_DESC"))
              ), 

              React.DOM.li({'data-type': "var", onClick: this._modeChange, className: (this.state.mode === "var")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "var")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, _("VAR_GRADING")), 
                React.DOM.p(null, _("VAR_GRADING_DESC"))
              ), 

              React.DOM.li({'data-type': "unit", onClick: this._modeChange, className: (this.state.mode === "unit")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "unit")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, _("UNITTEST_GRADING")), 
                React.DOM.p(null, _("UNITTEST_GRADING_DESC"))
              ), 

              React.DOM.li({'data-type': "turtle", onClick: this._modeChange, className: (this.state.mode === "turtle")?"selected":""}, 
                React.DOM.span({className: (this.state.mode === "turtle")?"fa fa-check fa-3x":""}), 
                React.DOM.h4(null, _("TURTLE_GRADING")), 
                React.DOM.p(null, _("TURTLE_GRADING_DESC"))
              )
            )
          ), 
          React.DOM.h2(null, _("CODELINES")), 
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
      this.props.onchange();
    },
    getInitialState: function() {
      return {codelines: (this.props.codelines || []).join("\n")}
    },
    render: function() {
      var _ = this.props._;
      var instructions = _("LINES_TO_SHOW");
      if (this.props.mode === "line") {
        instructions += "\n" + _("LINES_INSTRUCTIONS");
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
      this.props.onchange();
    },
    _codeChanged: function(evt) {
      this.setState({executableCode: evt.target.value});
      this.props.onchange();
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
      var _ = this.props._;
      return (
        React.DOM.div({className: "jsparsons-executable-editor jsparsons-component jsparsons-right"}, 
          React.DOM.p({className: "jsparsons-instructions"}, _("SELECT_LANG"), 
            React.DOM.select({name: "prog-lang", value: this.state.programmingLang, onChange: this._langChanged}, 
              React.DOM.option({value: "python"}, "Python"), 
              React.DOM.option({value: "pseudo"}, "Pseudo"), 
              React.DOM.option({value: "java"}, "Java"), 
              React.DOM.option({value: "other"}, _("OTHER_LANG"))
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
      return { vartests: this.props.vartests || [new VarCheckTest({_: this.props._, onchange: this.props.onchange})] };
    },
    _addCheck: function() {
      var newvartests = this.state.vartests.concat([new VarCheckTest({_: this.props._, onchange: this.props.onchange})]);
      this.setState({vartests: newvartests});
      this.props.onchange();
    },
    render: function() {
      var _ = this.props._,
          vartests = [];
      for (var i = 0; i < this.state.vartests.length; i++) {
        vartests.push(new VarCheckTest($.extend({ref: "varcheck" + i, _: this.props._, onchange: this.props.onchange}, this.state.vartests[i])));
      }
      return (
        React.DOM.div({className: "jsparsons-mode-editor"}, 
          React.DOM.h2(null, React.DOM.span({className: "fa fa-tasks"}), _("VAR_CHECK_CONF")), 
          React.DOM.div({className: "jsparsons-varcheck-editor"}, 
            vartests, 
            React.DOM.button({onClick: this._addCheck}, _("ADD_TESTCASE"))
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
      this.props.onchange();
    },
    _initCodeChanged: function(evt) {
      this.setState({initcode: evt.target.value});
      this.props.onchange();
    },
    _codeChanged: function(evt) {
      this.setState({code: evt.target.value});
      this.props.onchange();
    },
    _addVariable: function(evt) {
      var newVars = this.state.variables.concat([{key: "", value: ""}]);
      this.setState({variables: newVars});
      this.props.onchange();
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
      this.props.onchange();
    },
    render: function() {
      var varchecks = [];
      for (var i = 0; i < this.state.variables.length; i++) {
        var vari = this.state.variables[i];
        varchecks.push(new VarCheck({key: "var" + i, name: vari.key, value: vari.value, _: this.props._,
          onchange: this.props.onchange,
          update: function(i, name, val, valtype) {
            this._updateVariable(i, name, val, valtype);
          }.bind(this)}));
      }
      var _ = this.props._;
      return (
        React.DOM.div({className: "jsparsons-varcheck"}, 
          React.DOM.p(null, _("VAR_DESCRIPTION")), 
          React.DOM.textarea({type: "text", value: this.state.message, onChange: this._messageChanged}), 
          React.DOM.div({className: "jsparsons-varcheck-codes"}, 
            React.DOM.div({className: "jsparsons-component jsparsons-left"}, 
              React.DOM.p(null, _("VAR_CODE_BEFORE")), 
              React.DOM.textarea({type: "text", value: this.state.initcode, onChange: this._initCodeChanged})
            ), 
            React.DOM.div({className: "jsparsons-component jsparsons-right"}, 
              React.DOM.p(null, _("VAR_CODE_AFTER")), 
              React.DOM.textarea({type: "text", value: this.state.code, onChange: this._codeChanged})
            )
          ), 
          React.DOM.p(null, _("VAR_CHECKS")), 
          React.DOM.div({className: "jsparsons-varchecks"}, varchecks, React.DOM.div(null, React.DOM.button({onClick: this._addVariable}, "+")))
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
      this.props.onchange();
    },
    _valueChanged: function(evt) {
      this.setState({varvalue: evt.target.value});
      this.props.update(this.props.key.replace("var", ""), this.state.varname, evt.target.value, this.state.vartype);
      this.props.onchange();
    },
    _typeChanged: function(evt) {
      this.setState({vartype: evt.target.value});
      this.props.update(this.props.key.replace("var", ""), this.state.varname, this.state.varvalue, evt.target.value);
      this.props.onchange();
    },
    render: function() {
      var _ = this.props._;
      return (
        React.DOM.div(null, 
          React.DOM.input({type: "text", value: this.state.varname, onChange: this._nameChanged, placeholder: _("NAME")}), 
          React.DOM.textarea({rows: "1", value: this.state.varvalue, onChange: this._valueChanged}), 
          React.DOM.select({value: this.state.vartype, onChange: this._typeChanged}, 
            React.DOM.option({value: "int"}, _("TYPE_INT")), 
            React.DOM.option({value: "decimal"}, _("TYPE_DECIMAL")), 
            React.DOM.option({value: "boolean"}, _("TYPE_BOOLEAN")), 
            React.DOM.option({value: "string"}, _("TYPE_STRING"))
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
      this.props.onchange();
    },
    render: function() {
      return (
        React.DOM.div({className: "jsparsons-mode-editor"}, 
          React.DOM.h2(null, React.DOM.span({className: "fa fa-check-circle"}), "Unit tests"), 
          React.DOM.div({className: "jsparsons-unit-editor jsparsons-component-container"}, 
            React.DOM.div({className: "jsparsons-component jsparsons-left"}, 
              React.DOM.textarea({rows: "10", value: this.state.unittests, onChange: this._testsChanged})
            ), 
            React.DOM.p({className: "jsparsons-component jsparsons-right"}, "TODO: Instructions...")
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
      this.props.onchange();
    },
    _testCodeChanged: function(evt) {
      this.setState({turtleTestCode: evt.target.value});
      this.props.onchange();
    },
    _penChanged: function(evt) {
      this.setState({turtlePenDown: evt.target.checked});
      this.props.onchange();
    },
    render: function() {
      var _ = this.props._;
      return (
        React.DOM.div({className: "jsparsons-mode-editor"}, 
          React.DOM.h2(null, React.DOM.span({className: "fa fa-bug"}), _("TURTLE_CONF")), 
          React.DOM.div({className: "jsparsons-turtle-editor jsparsons-component-container"}, 
            React.DOM.div({className: "jsparsons-turtle-model jsparsons-component jsparsons-left"}, 
              React.DOM.p({className: "jsparsons-instructions"}, _("TURTLE_MODEL_INSTR")), 
              React.DOM.textarea({rows: "3", value: this.state.turtleModelCode, onChange: this._modelCodeChanged}), 
              React.DOM.input({type: "checkbox", checked: this.state.turtlePenDown, id: "jsparsons-edit-turtlepen", 
                    onChange: this._penChanged}), 
              React.DOM.label({htmlFor: "jsparsons-edit-turtlepen"}, _("TURTLE_PENDOWN"))
            ), 
            React.DOM.div({className: "jsparsons-turtle-test jsparsons-component jsparsons-right"}, 
              React.DOM.p({className: "jsparsons-instructions"}, _("TURTLE_CODE_AFTER_INSTR")), 
              React.DOM.textarea({rows: "3", value: this.state.turtleTestCode, onChange: this._testCodeChanged})
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
          'trashId': 'jsparsons-preview-source',
          'lang': this.props.language
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
        this.setState({feedback: "<h2>" + this.props._("FEEDBACK_TITLE") + "</h2>" + fb.feedback});
      } else {
        this.setState({feedback: this.props._("SOLVED_FEEDBACK")});
      }
    },
    render: function() {
      var _ = this.props._;
      return (
        React.DOM.div(null, 
          React.DOM.div({className: (this.state.visible?"visible ":"") + "jsparsons-preview"}, 
            React.DOM.button({onClick: this._close}, React.DOM.span({className: "fa fa-close fa-2x"}), _("CLOSE")), 
            React.DOM.h3(null, _("PREVIEW_TITLE")), 
            React.DOM.div({className: "jsparsons-container"}, 
              React.DOM.div({id: "jsparsons-preview-source", className: "sortable-code jsparsons-source"}), 
              React.DOM.div({id: "jsparsons-preview-target", className: "sortable-code jsparsons-target"})
            ), 
            React.DOM.div({className: "jsparsons-container jsparsons-buttons"}, 
              React.DOM.div({onClick: this._resetWidget}, _("RESET")), 
              React.DOM.div({onClick: this._showWidgetFeedback}, _("FEEDBACK"))
            ), 
            React.DOM.div({className: "jsparsons-feedback", dangerouslySetInnerHTML: {__html:this.state.feedback}})
          ), 
          React.DOM.div({className: "jsparsons-test-button", onClick: this.testWidget}, _("TEST_BUTTON"))
        )
      );
    }
  });

  window.ParsonsEditorComponent = ParsonsEditorComponent;
}());