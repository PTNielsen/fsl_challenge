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
        <form id='household_form'>
          <input type='text' id='make' ref='make' placeholder='Make' required></input>
          <input type='text' id='model' ref='model' placeholder='Model' required></input>
          <input type='number' id='year' ref='year' placeholder='Year' required min='1900' max='2017'></input>
          <input type='text' id="license_plate" ref='license_plate' placeholder='License Plate' required></input>
          <select id='owner_id' name='owner_id' ref='owner_id'>
            {this.state.residents.map( (r) => {
              return <option key={r.id} value={r.id}>{r.first_name + ' ' + r.last_name}</option>
            })}
          </select>
        </form>

        <button type='button' onClick={this._handleSubmit.bind(this)}>Next</button>
        <button type='button' onClick={this._newForm.bind(this)}>Add Another</button>
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
        throw new Error();
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

  _newForm() {
    console.log('Vehicle New Form');
  }

  _packageParams() {
    return {
      "vehicle": {
        "make": this.refs.make.value,
        "model": this.refs.model.value,
        "year": this.refs.year.value,
        "license_plate": this.refs.license_plate.value,
        "owner_id": this.refs.owner_id.value
      }
    }
  }
}
