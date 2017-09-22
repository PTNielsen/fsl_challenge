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
        <form id='household_form'>
          <input
            type='text'
            id='address_1'
            ref={ input => { this.address1 = input } }
            placeholder='Address 1'
            autoFocus></input>
          <input
            type='text'
            id='address_2'
            ref={ input => { this.address2 = input } }
            placeholder='Address 2'></input>
          <input
            type='text'
            id='city'
            ref={ input => { this.city = input } }
            placeholder='City'></input>
          <input
            type='text'
            id='state'
            ref={ input => { this.stateString = input } }
            placeholder='State'></input>
          <input
            type='number'
            id='bedroom_count'
            ref={ input => { this.bedroomCount = input } }
            placeholder='Bedroom Count'></input>
        </form>

        <button type='button' onClick={this._handleSubmit.bind(this)}>Next</button>
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
    const refs = this.refs

    return {
      "household": {
        "address_1": this.address1.value,
        "address_2": this.address2.value,
        "city": this.city.value,
        "state": this.stateString.value,
        "bedroom_count": this.bedroomCount.value
      }
    }
  }
}
