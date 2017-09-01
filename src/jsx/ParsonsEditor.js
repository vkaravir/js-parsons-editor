import React, {Component} from 'react';
import {connect} from 'react-redux';

import CodelineEditor from './CodelineEditor';
import ExecutableEditor from './ExecutableEditor';
import VarCheckEditor from './VarCheckEditor';
import UnittestEditor from './UnittestEditor';
import TurtleEditor from './TurtleEditor';
import TestButton from './TestButton';

import {getTranslator} from '../translations';
import editorActions from '../actions/editors';

const mapStateToProps = state => {
  return {
    mode: state.mode,
    codelines: Array.isArray(state.codelines) ? state.codelines.join('\n') : state.codelines,
    unittests: state.unittests,
    programmingLang: state.programmingLang,
    executableCode: state.executableCode,
    turtle: state.turtle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onModeClick: mode => dispatch(editorActions.selectMode(mode)),
    onCodeChange: evt => dispatch(editorActions.setCodelines(evt.target.value)),
    onUnittestChange: evt => dispatch(editorActions.setUnittests(evt.target.value)),
    onProgrammingLangChange: evt => dispatch(editorActions.setProgrammingLang(evt.target.value)),
    onExecutableCodeChange: evt => dispatch(editorActions.setExecutableCode(evt.target.value)),
    onToggleTurtlePen: () => dispatch(editorActions.turtle.togglePen()),
    onTurtleTestCodeChange: evt => dispatch(editorActions.turtle.setTestCode(evt.target.value)),
    onTurtleModelCodeChange: evt => dispatch(editorActions.turtle.setModelCode(evt.target.value)),
  };
};

class ParsonsEditorComponent extends Component {
  getExerciseConfig() {
    var conf = {mode: this.props.mode, codelines: this.refs.codelineEditor.getConfig()};
    if (this.props.mode !== 'line') {
      Object.assign(conf, this.refs.executableEditor.getConfig(), this.refs.modeEditor.getConfig());
    }
    return conf;
  }

  getEditor(translator) {
    switch (this.props.mode) {
      case 'var':
        return <VarCheckEditor ref='modeEditor'
                              vartests={this.props.vartests}
                              _={translator}
                              onchange={this.props.onchange} />;
      case 'turtle':
        return <TurtleEditor {...this.props.turtle}
                                _={translator}
                                onTestCodeChange={this.props.onTurtleTestCodeChange}
                                onModelCodeChange={this.props.onTurtleModelCodeChange}
                                onPenToggle={this.props.onToggleTurtlePen} />;
      case 'unit':
        return <UnittestEditor unittests={this.props.unittests}
                                _={translator}
                                onChange={this.props.onUnittestChange} />;
      default:
        return;
    }
  }

  getExecutableEditor(translator) {
    if (['var', 'unit', 'turtle'].indexOf(this.props.mode) !== -1) {
      return <ExecutableEditor programmingLang={this.props.programmingLang}
                              executableCode={this.props.executableCode}
                              _={translator}
                              onChange={this.props.onExecutableCodeChange}
                              onLanguageChange={this.props.onProgrammingLangChange} />;
    }
  }

  render() {
    var translator = getTranslator(this.props.language);
    var _ = translator;
    return (
      <div className={'jsparsons-editor-container jsparsons-' + this.props.mode + '-editor jsparsons-' + this.props.language}>
        <h2>{_('GRADING_TYPE')}</h2>
        <div className='jsparsons-mode-choice jsparsons-component-container'>
          <ul>
            <li data-type='line' onClick={() => this.props.onModeClick('line')} className={(this.props.mode === 'line')?'selected':''}>
              <span className={(this.props.mode === 'line')?'fa fa-check fa-3x':''}></span>
              <h4>{_('LINE_GRADING')}</h4>
              <p>{_('LINE_GRADING_DESC')}</p>
            </li>

            <li data-type='var' onClick={() => this.props.onModeClick('var')} className={(this.props.mode === 'var')?'selected':''}>
              <span className={(this.props.mode === 'var')?'fa fa-check fa-3x':''}></span>
              <h4>{_('VAR_GRADING')}</h4>
              <p>{_('VAR_GRADING_DESC')}</p>
            </li>

            <li data-type='unit' onClick={() => this.props.onModeClick('unit')} className={(this.props.mode === 'unit')?'selected':''}>
              <span className={(this.props.mode === 'unit')?'fa fa-check fa-3x':''}></span>
              <h4>{_('UNITTEST_GRADING')}</h4>
              <p>{_('UNITTEST_GRADING_DESC')}</p>
            </li>

            <li data-type='turtle' onClick={() => this.props.onModeClick('turtle')} className={(this.props.mode === 'turtle')?'selected':''}>
              <span className={(this.props.mode === 'turtle')?'fa fa-check fa-3x':''}></span>
              <h4>{_('TURTLE_GRADING')}</h4>
              <p>{_('TURTLE_GRADING_DESC')}</p>
            </li>
          </ul>
        </div>
        <h2>{_('CODELINES')}</h2>
        <div className='jsparsons-codelines-container jsparsons-component-container'>
          <CodelineEditor mode={this.props.mode}
                          codelines={this.props.codelines}
                          _={translator}
                          onChange={this.props.onCodeChange} />
          {this.getExecutableEditor(translator)}
        </div>
        {this.getEditor(translator)}
        <TestButton {...this.props}
                    _={translator} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParsonsEditorComponent);
