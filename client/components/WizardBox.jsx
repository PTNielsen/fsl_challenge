import React from 'react';
import FormBox from './FormBox.jsx';

export default class WizardBox extends React.Component {
  constructor() {
    super();

    this.state = {
      households: []
    };
  }

  componentWillMount() {
    this._getHouseholds();
  }

  render() {
    return (
      <section>
        <h1>YOOOOOOO dawg</h1>
        <FormBox />
      </section>
    )
  }

  _getHouseholds() {
    fetch('/household', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    }).then( (response) => {
      return response.json();
    }).then( (jsonData) => {
      this.setState({households: jsonData});
    }).catch( (error) => {
      console.log('Error: ', error);
    });
  }
}
