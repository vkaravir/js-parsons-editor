/* global ParsonsWidget */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import ExerciseConfiguration from './ExerciseConfiguration';
import {getConfiguration} from '../selectors';

const mapStateToProps = (state, props) => {
  return Object.assign({config: getConfiguration(state)}, props);
};

class TestButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feedback: ''
    };
  }

  testWidget() {
    var parson = new ParsonsWidget(Object.assign({
      sortableId: 'jsparsons-preview-target',
      trashId: 'jsparsons-preview-source',
      lang: this.props.language
    }, this.props.config));
    parson.init(this.props.config.codelines);
    parson.shuffleLines();
    this.setState({
      visible: true,
      parson: parson
    });
  }

  _close() {
    this.setState({
      visible: false,
      feedback: ''
    });
  }

  _resetWidget() {
    this.state.parson.shuffleLines();
    this.setState({
      feedback: ''
    });
  }

  _showWidgetFeedback() {
    var fb = this.state.parson.getFeedback();
    if (fb.length) {
      this.setState({feedback: fb.join('\n')});
    } else if (fb.feedback) {
      this.setState({feedback: '<h2>' + this.props._('FEEDBACK_TITLE') + '</h2>' + fb.feedback});
    } else {
      this.setState({feedback: this.props._('SOLVED_FEEDBACK')});
    }
  }

  _showConfig() {
    this.setState({configVisible: true});
  }

  _hideConfig() {
    this.setState({configVisible: false});
  }

  getExerciseConfigElement() {
    if (this.state.configVisible) {
      return (
        <ExerciseConfiguration close={this._hideConfig.bind(this)}
                      config={this.props.config}
                      _={this.props._} />
      );
    }
  }

  render() {
    var _ = this.props._;
    return (
      <div>
        <div className={(this.state.visible?'visible ':'') + 'jsparsons-preview'}>
          <div className="jsparsons-preview__header">
            <a href="#" className="fa fa-close fa-2x jsparsons-preview__link" onClick={this._close.bind(this)}></a>
            <h3 className="jsparsons-preview__title">{_('PREVIEW_TITLE')}</h3>
            <a href="#" className="jsparsons-preview__link" onClick={this._showConfig.bind(this)}>Show config</a>
          </div>
          <div className="jsparsons-container">
            <div id="jsparsons-preview-source" className="sortable-code jsparsons-source"></div>
            <div id="jsparsons-preview-target" className="sortable-code jsparsons-target"></div>
          </div>
          <div className="jsparsons-container jsparsons-buttons">
            <div onClick={this._resetWidget.bind(this)}>{_('RESET')}</div>
            <div onClick={this._showWidgetFeedback.bind(this)}>{_('FEEDBACK')}</div>
          </div>
          <div className="jsparsons-feedback" dangerouslySetInnerHTML={{__html:this.state.feedback}}></div>
        </div>
        {this.getExerciseConfigElement()}
        <div className="jsparsons-test-button" onClick={this.testWidget.bind(this)}>{_('TEST_BUTTON')}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TestButton);
