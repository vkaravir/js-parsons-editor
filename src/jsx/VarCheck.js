import React, {Component} from 'react';

class VarCheck extends Component {
  // getInitialState() {
  //   // handle the type of the variable value
  //   // if it's a number, try to convert to integer and then decimal
  //   // everything else is treated as a string
  //   var value = this.props.value,
  //       type = typeof value;
  //   if (type === "number") {
  //     if ("" + parseInt(value, 10) == value) {
  //       type = "int";
  //     } else {
  //       type = "decimal";
  //     }
  //   } else if (type === "boolean") {
  //     // nothing to do
  //   } else { // force everything into a string
  //     type = "string";
  //   }
  //   return {name: this.props.name, value: value, type: type || "string" };
  // }

  _nameChanged(evt) {
    this.props.onChange(this.props.index, evt.target.value, this.props.value, this.props.type);
  }

  _valueChanged(evt) {
    this.props.onChange(this.props.index, this.props.name, evt.target.value, this.props.type);
  }

  _typeChanged(evt) {
    this.props.onChange(this.props.index, this.props.name, this.props.value, evt.target.value);
  }

  render() {
    var _ = this.props._;
    return (
      <div>
        <input type="text" value={this.props.name} onChange={this._nameChanged.bind(this)} placeholder={_('NAME')}/>
        <textarea rows="1" value={this.props.value} onChange={this._valueChanged.bind(this)}/>
        <select value={this.props.type} onChange={this._typeChanged.bind(this)}>
          <option value="int">{_('TYPE_INT')}</option>
          <option value="decimal">{_('TYPE_DECIMAL')}</option>
          <option value="boolean">{_('TYPE_BOOLEAN')}</option>
          <option value="string">{_('TYPE_STRING')}</option>
        </select>
      </div>
    );
  }
}

export default VarCheck;
