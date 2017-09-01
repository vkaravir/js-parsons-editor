import React from 'react';

const ExecutableEditor = (props) => {
  var _ = props._;
  return (
    <div className="jsparsons-executable-editor jsparsons-component jsparsons-right">
      <p className="jsparsons-instructions">{_('SELECT_LANG')}
        <select name="prog-lang" value={props.programmingLang} onChange={props.onLanguageChange}>
          <option value="python">Python</option>
          <option value="pseudo">Pseudo</option>
          <option value="java">Java</option>
          <option value="other">{_('OTHER_LANG')}</option>
        </select>
      </p>
      <textarea rows="10" disabled={props.programmingLang === 'python'} className={'jsparsons-' + props.programmingLang}
            value={props.executableCode} onChange={props.onChange}>
      </textarea>
    </div>
  );
};

export default ExecutableEditor;
