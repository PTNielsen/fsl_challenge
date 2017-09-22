import React from 'react';
import HouseholdForm from './HouseholdForm.jsx';
import PersonForm from './PersonForm.jsx';
import VehicleForm from './VehicleForm.jsx';
import Summary from './Summary.jsx';
import * as PAGES from '../constants/PageTypes.js';

export default class WizardBox extends React.Component {
  render() {
    const { wizard, actions } = this.props;
    const component = this._determinePage(wizard, actions);

    return (
      <section id="form-box">
        {component}
      </section>
    )
  }

  _determinePage(wizard, actions) {
    switch (wizard.page) {
      case (PAGES.HOUSEHOLD_PAGE):
        return <HouseholdForm
          actions={actions}
          nextPage={PAGES.PERSON_PAGE} />;
      case (PAGES.PERSON_PAGE):
        return <PersonForm
          actions={actions}
          nextPage={PAGES.VEHICLE_PAGE}
          householdId={wizard.householdId} />;
      case (PAGES.VEHICLE_PAGE):
        return <VehicleForm
          actions={actions}
          nextPage={PAGES.SUMMARY_PAGE} 
          householdId={wizard.householdId} />;
      case (PAGES.SUMMARY_PAGE):
        return <Summary householdId={wizard.householdId}/>;
    }
  }
}
