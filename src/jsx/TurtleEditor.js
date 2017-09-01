import React from 'react';

const TurtleEditor = (props) => {
  var _ = props._;
  return (
    <div className="jsparsons-mode-editor">
      <h2><span className="fa fa-bug"/>{_('TURTLE_CONF')}</h2>
      <div className="jsparsons-turtle-editor jsparsons-component-container">
        <div className="jsparsons-turtle-model jsparsons-component jsparsons-left">
          <p className="jsparsons-instructions">{_('TURTLE_MODEL_INSTR')}</p>
          <textarea rows="3" value={props.modelCode} onChange={props.onModelCodeChange} />
          <input type="checkbox" checked={props.penDown} id="jsparsons-edit-turtlepen"
                onChange={props.onPenToggle}/>
          <label htmlFor="jsparsons-edit-turtlepen">{_('TURTLE_PENDOWN')}</label>
        </div>
        <div className="jsparsons-turtle-test jsparsons-component jsparsons-right">
          <p className="jsparsons-instructions">{_('TURTLE_CODE_AFTER_INSTR')}</p>
          <textarea rows="3" value={props.testCode} onChange={props.onTestCodeChange} />
        </div>
      </div>
    </div>
  );
};

export default TurtleEditor;
