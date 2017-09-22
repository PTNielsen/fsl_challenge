import React from 'react';

export default class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.changePage = props.actions.changePage;
  }
  
  render() {
    return(
      <div>
        <form id='household_form'>
          <input type='text' id='make' ref='make' placeholder='Make' required></input>
          <input type='text' id='model' ref='model' placeholder='Model' required></input>
          <input type='number' id='year' ref='year' placeholder='Year' required min='1900' max='2017'></input>
          <input type='text' id="license_plate" ref='license_plate' placeholder='License Plate' required></input>
        </form>

        <button onClick={this._handleSubmit.bind(this)}>Next</button>
        <button onClick={this._newForm.bind(this)}>Add Another</button>
      </div>
    )
  }

  _handleSubmit(event) {
    event.preventDefault();

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
      console.log('Oh no something went wrong in the fetch post call');
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
        "owner_id": 1
      }
    }
  }
}
