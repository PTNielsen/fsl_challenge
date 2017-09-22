import React from 'react';
require('../stylesheets/SummaryStyles.scss');

export default class Summary extends React.Component {
  constructor() {
    super();

    this.state = {
      summary: {}
    }
  }

  componentWillMount() {
    this._getSummaryData();
  }

  render() {
    return(
      <h1>Summary!</h1>
    )
  }

  _getSummaryData() {
    const householdId = this.props.householdId;
    
    fetch(`/household/${householdId}/summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    }).then( (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    }).then( (jsonData) => {
      this.setState({summary: jsonData});
    }).catch( (error) => {
      console.log('Error: ', error);
    });
  }
}
