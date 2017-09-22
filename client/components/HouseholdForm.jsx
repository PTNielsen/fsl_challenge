import React from 'react';

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
          <input type='text' id='address_1' ref='address_1' placeholder='Address 1' required></input>
          <input type='text' id='address_2' ref='address_2' placeholder='Address 2' required></input>
          <input type='text' id='city' ref='city' placeholder='City' required></input>
          <input type='text' id='state' ref='state' placeholder='State' required></input>
          <input type='number' id='bedroom_count' ref='bedroom_count' placeholder='Bedroom Count' required></input>
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
        "address_1": refs.address_1.value,
        "address_2": refs.address_2.value,
        "city": refs.city.value,
        "state": refs.state.value,
        "bedroom_count": refs.bedroom_count.value
      }
    }
  }
}
