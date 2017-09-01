import React from 'react';

const UnittestEditor = (props) => {
  return (
    <div className="jsparsons-mode-editor">
      <h2><span className="fa fa-check-circle"/>Unit tests</h2>
      <div className="jsparsons-unit-editor jsparsons-component-container">
        <div className="jsparsons-component jsparsons-left">
          <textarea rows="10" value={props.unittests} onChange={props.onChange} />
        </div>
        <p className="jsparsons-component jsparsons-right" dangerouslySetInnerHTML={{__html:props._('UNITTEST_INSTRUCTIONS')}}></p>
      </div>
    </div>
  );
};

export default UnittestEditor;
