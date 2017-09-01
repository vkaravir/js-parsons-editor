import React, {Component} from 'react';

import VarCheck from './VarCheck';

class VarCheckTest extends Component {
  // TODO: this needs to be done somewhere!
  // _updateVariable(i, name, value, valtype) {
  //   this.state.variables[i].key = name;
  //   var newVal;
  //   if (valtype === "boolean") {
  //     newVal = (value==="true"?true:false);
  //   } else if (valtype === "int") {
  //     newVal = parseInt(value, 10);
  //   } else if (valtype === "decimal") {
  //     newVal = parseFloat(value, 10);
  //   } else {
  //     newVal = "" + value;
  //   }
  //   this.state.variables[i].value = newVal;
  //   // this.props.onchange();
  // }

  _addVariable() {
    this.props.onAddVariable(this.props.index);
  }

  _messageChanged(evt) {
    this.props.onPropertyChange(this.props.index, 'message', evt.target.value);
  }

  _initCodeChanged(evt) {
    this.props.onPropertyChange(this.props.index, 'initcode', evt.target.value);
  }

  _codeChanged(evt) {
    this.props.onPropertyChange(this.props.index, 'code', evt.target.value);
  }

  render() {
    var varchecks = this.props.variables.map((variable, index) =>
          <VarCheck key={'var' + index} index={index} {...variable}
                    _={this.props._}
                    onChange={this.props.onVariableChange} />
    );
    var _ = this.props._;
    return (
      <div className="jsparsons-varcheck">
        <p>{_('VAR_DESCRIPTION')}</p>
        <textarea type="text" value={this.props.message} onChange={this._messageChanged.bind(this)} />
        <div className="jsparsons-varcheck-codes">
          <div className="jsparsons-component jsparsons-left">
            <p>{_('VAR_CODE_BEFORE')}</p>
            <textarea type="text" value={this.props.initcode} onChange={this._initCodeChanged.bind(this)} />
          </div>
          <div className="jsparsons-component jsparsons-right">
            <p>{_('VAR_CODE_AFTER')}</p>
            <textarea type="text" value={this.props.code} onChange={this._codeChanged.bind(this)} />
          </div>
        </div>
        <p>{_('VAR_CHECKS')}</p>
        <div className="jsparsons-varchecks">{varchecks}<div><button onClick={this._addVariable.bind(this)}>+</button></div></div>
      </div>
    );
  }
}

export default VarCheckTest;
