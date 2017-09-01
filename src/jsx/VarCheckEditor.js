import React, {Component} from 'react';
import {connect} from 'react-redux';

import VarCheckTest from './VarCheckTest';
import variableActions from '../actions/editors/variable';

const mapStateToProps = (state) => {
  return {
    vartests: state.vartests
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTestCase: () => dispatch(variableActions.addTestCase()),
    onAddVariable: (index) => dispatch(variableActions.addVariable(index)),
    onPropertyChange: (index, name, value) => dispatch(variableActions.setProperty(index, name, value)),
    onVariableChange: (checkIndex) => {
      return (index, name, value, type) => dispatch(variableActions.setVariable(checkIndex, index, name, value, type));
    },
  };
};

class VarCheckEditor extends Component {
  render() {
    var _ = this.props._;
    const vartests = this.props.vartests.map((test, index) =>
      <VarCheckTest {...test} index={index} key={`varcheck${index}`}
                _={this.props._}
                onAddVariable={this.props.onAddVariable}
                onPropertyChange={this.props.onPropertyChange}
                onVariableChange={this.props.onVariableChange(index)}/>
    );
    return (
      <div className="jsparsons-mode-editor">
        <h2><span className="fa fa-tasks"/>{_('VAR_CHECK_CONF')}</h2>
        <div className="jsparsons-varcheck-editor">
          {vartests}
          <button onClick={this.props.onAddTestCase}>{_('ADD_TESTCASE')}</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VarCheckEditor);
