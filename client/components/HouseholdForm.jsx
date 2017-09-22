import React from 'react';

export default class HouseholdForm extends React.Component {
  constructor(props) {
    super(props);

    this.changePage     = props.actions.changePage;
    this.setHouseholdId = props.actions.setHouseholdId;
  }
  
  render() {
    return(
      <section>
        <form id='household_form'>
          <label htmlFor='address_1'>Address 1: </label>
          <input type='text' id='address_1' ref='address_1' placeholder='Address 1' required></input>

          <label htmlFor='address_2'>Address 2: </label>
          <input type='text' id='address_2' ref='address_2' placeholder='Address 2' required></input>

          <label htmlFor='city'>City: </label>
          <input type='text' id='city' ref='city' placeholder='City' required></input>

          <label htmlFor='state'>State: </label>
          <input type='text' id='state' ref='state' placeholder='State' required></input>

          <label htmlFor='bedroom_count'>Bedroom Count: </label>
          <input type='number' id='bedroom_count' ref='bedroom_count' placeholder='Bedroom Count' required></input>
        </form>

        <button onClick={this._handleSubmit.bind(this)}>Next</button>
      </section>
    )
  }

  _handleSubmit(event) {
    event.preventDefault();

    fetch('/household', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify(this._packageParams())
    }).then( (response) => {;
      return response.json();
    }).then( (json) => {
      this.setHouseholdId(json);
      this.changePage(this.props.nextPage);
    }).catch( (error) => {
      console.log('Oh no something went wrong in the fetch post call');
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
