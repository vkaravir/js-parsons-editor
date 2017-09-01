import React from 'react';

const CodelineEditor = (props) => {
  var _ = props._;
  var instructions = _('LINES_TO_SHOW');
  if (props.mode === 'line') {
    instructions += '\n' + _('LINES_INSTRUCTIONS');
  }
  return (
    <div className='jsparsons-codelines jsparsons-component jsparsons-left'>
      <p className='jsparsons-instructions'>{instructions}</p>
      <textarea rows='10' onChange={props.onChange} value={props.codelines} />
    </div>
  );
};

export default CodelineEditor;
