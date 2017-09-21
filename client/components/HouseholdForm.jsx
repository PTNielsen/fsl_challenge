import React from 'react';

export default class HouseholdForm extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }
  
  render() {
    return(
      <h1>Household Form!</h1>
    )
  }

  _formatCity(city) {
    return city || 'None listed'
  }
}
