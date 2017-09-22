import React from 'react';
require('../stylesheets/FormStyles.scss');

export default class HouseholdForm extends React.Component {
  constructor(props) {
    super(props);

    this.changePage     = props.actions.changePage;
    this.setHouseholdId = props.actions.setHouseholdId;
  }
  
  render() {
    return(
      <div>
        <h1 className="form-header">Your Household</h1>
        <form id='household_form'>
          <label htmlFor="address_1">Address 1</label>
          <input
            type='text'
            id='address_1'
            ref={ input => { this.address1 = input } }
            autoFocus></input>

          <label htmlFor="address_2">Address 2</label>
          <input
            type='text'
            id='address_2'
            ref={ input => { this.address2 = input } }></input>

          <label htmlFor="city">City</label>
          <input
            type='text'
            id='city'
            ref={ input => { this.city = input } }></input>

          <label htmlFor="state">State</label>
          <input
            type='text'
            id='state'
            ref={ input => { this.stateString = input } }></input>

          <label htmlFor="zip">Zip</label>
          <input
            type='text'
            id='city'
            ref={ input => { this.zip = input } }></input>

          <label htmlFor="bedroom_count">Bedroom Count</label>
          <input
            type='number'
            id='bedroom_count'
            ref={ input => { this.bedroomCount = input } }
            min='0'></input>

          <button type='button' onClick={this._handleSubmit.bind(this)}>Next</button>
        </form>
      </div>
    )
  }

  _handleSubmit() {
    fetch('/household', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify(this._packageParams())
    }).then( (response) => {;
      if (response.ok) {
        this.changePage(this.props.nextPage);
        return response.json();
      } else {
        throw new Error("Household not created");
      }
    }).then( (json) => {
      this.setHouseholdId(json);
    }).catch( (error) => {
      console.log(error);
    })
  }

  _packageParams() {
    return {
      "household": {
        "address_1": this.address1.value,
        "address_2": this.address2.value,
        "city": this.city.value,
        "state": this.stateString.value,
        "zip": this.zip.value,
        "bedroom_count": this.bedroomCount.value
      }
    }
  }
}
