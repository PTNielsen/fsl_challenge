import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import WizardBox from '../components/WizardBox.jsx'
import * as ACTIONS from '../actions/wizardActions.js';
require('../stylesheets/Main.scss');

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <WizardBox 
        wizard={this.props.wizard}
        actions={this.props.actions} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wizard: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ACTIONS, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
