import React from 'react';

const ExerciseConfiguration = (props) => {
  var _ = props._;
  var config = Object.assign({}, props.config);
  var codelines = config.codelines;
  delete config.codelines;
  var configStr = 'var options = ' + JSON.stringify(config, null, 2) + ';\n' +
                  'var codelines = "' + codelines.replace(/\n/g, '\\n').replace(/"/g, '\\\"') + '";\n\n' +
                  'var parson = new ParsonsWidget(options);\n' +
                  'parson.init(codelines);';

  return (
    <div className="jsparsons-exercise-config__container">
      <div className="jsparsons-preview__header">
        <a href="#" className="fa fa-close fa-2x jsparsons-preview__link" onClick={props.close}></a>
        <h3 className="jsparsons-preview__title">{_('CONFIGURATION_TITLE')}</h3>
      </div>
      <textarea className="jsparsons-exercise-config__code" defaultValue={configStr}></textarea>
    </div>
  );
};

export default ExerciseConfiguration;
