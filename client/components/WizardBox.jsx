import React from 'react';
import HouseholdForm from './HouseholdForm.jsx';
import PersonForm from './PersonForm.jsx';
import VehicleForm from './VehicleForm.jsx';
import Summary from './Summary.jsx';
import * as PAGES from '../constants/PageTypes.js';

export default class WizardBox extends React.Component {
  render() {
    const { wizard, actions } = this.props;
    const component = this._determinePage(wizard.page, actions);

    return (
      <section>
        {component}
      </section>
    )
  }

  _determinePage(page, actions) {
    switch (page) {
      case (PAGES.HOUSEHOLD_PAGE):
        return <HouseholdForm
          actions={actions}
          nextPage={PAGES.PERSON_PAGE} />;
      case (PAGES.PERSON_PAGE):
        return <PersonForm
          actions={actions}
          nextPage={PAGES.VEHICLE_PAGE}
          householdId={this.props.wizard.householdId} />;
      case (PAGES.VEHICLE_PAGE):
        return <VehicleForm
          actions={actions}
          nextPage={PAGES.SUMMARY_PAGE} />;
      case (PAGES.SUMMARY_PAGE):
        return <Summary summary={this._getSummaryData()}/>;
    }
  }

  _getSummaryData() {
    const householdId = this.props.wizard.householdId;

    fetch(`/household/${householdId}/summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    }).then( (response) => {
      return response.json();
    }).then( (jsonData) => {
      console.log(jsonData);
    }).catch( (error) => {
      console.log('Error: ', error);
    });
  }
}
