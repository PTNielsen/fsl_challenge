import React from 'react';
require('../stylesheets/FormStyles.scss');

export default class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.changePage = props.actions.changePage;
    this.state = {
      residents: []
    }
  }
  
  componentWillMount() {
    this._getResidents();
  }

  render() {
    return(
      <div>
        <h1 className="form-header">Your Vehicles</h1>
        <form id='household_form'>
          <label htmlFor="make">Make</label>
          <input
            type='text'
            id='make'
            ref={ input => { this.make = input } }
            autoFocus></input>

          <label htmlFor="model">Model</label>
          <input
            type='text'
            id='model'
            ref={ input => { this.model = input } }></input>

          <label htmlFor="year">Year</label>
          <input
            type='number'
            id='year'
            ref={ input => { this.year = input } }
            min='1885'
            max='2018'></input>

          <label htmlFor="license_plate">License Plate</label>
          <input
            type='text'
            id="license_plate"
            ref={ input => { this.licensePlate = input } }></input>

          <label htmlFor="owner_id">Owner</label>
          <select
            id='owner_id'
            name='owner_id'
            ref={ input => { this.ownerId = input } }>
              {this.state.residents.map( (r) => {
                return <option key={r.id} value={r.id}>{r.first_name + ' ' + r.last_name}</option>
              })}
          </select>

          <button type='button' onClick={this._handleSubmit.bind(this)}>Next</button>
        </form>
      </div>
    )
  }

  _handleSubmit() {
    fetch('/vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify(this._packageParams())
    }).then( (response) => {
      if (response.ok) {
        this.changePage(this.props.nextPage);
      } else {
        throw new Error("Vehicle not created");
      }
    }).catch( (error) => {
      console.log(error);
    })
  }

  _getResidents() {
    const householdId = this.props.householdId;
    
    fetch(`/household/${householdId}/residents`, {
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
      this.setState({residents: jsonData});
    }).catch( (error) => {
      console.log(error);
    })
  }
  _packageParams() {
    return {
      "vehicle": {
        "make": this.make.value,
        "model": this.model.value,
        "year": this.year.value,
        "license_plate": this.licensePlate.value,
        "owner_id": this.ownerId.value
      }
    }
  }
}
