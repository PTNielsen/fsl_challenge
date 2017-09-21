import React from 'react';
import HouseholdForm from './HouseholdForm.jsx';
import PersonForm from './PersonForm.jsx';
import VehicleForm from './VehicleForm.jsx';
import Summary from './Summary.jsx';

export default class FormBox extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }
  
  render() {
    return(
      <section>
        <HouseholdForm />
        <PersonForm />
        <VehicleForm />
        <Summary />
      </section>
    )
  }
}
