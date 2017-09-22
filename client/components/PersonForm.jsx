import React from 'react';
require('../stylesheets/FormStyles.scss');

export default class PersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = props.actions.changePage;
  }
  
  render() {
    return(
      <div>
        <h1 className="form-header">You</h1>
        <form id='person_form'>
          <label htmlFor="first_name">First Name</label>
          <input
            type='text'
            id='first_name'
            ref={ input => { this.firstName = input } }
            autoFocus></input>
          
          <label htmlFor="last_name">Last Name</label>
          <input
            type='text'
            id="last_name"
            ref={ input => { this.lastName = input } }></input>

          <label htmlFor="email">Email</label>
          <input
            type='text'
            id="email"
            ref={ input => { this.email = input } }></input>

          <label htmlFor="gender">Gender</label>
          <select
            id='gender'
            name='gender'
            ref={ input => { this.gender = input } }>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
          </select>

          <button type='button' onClick={this._handleSubmit.bind(this)}>Next</button>
        </form>
      </div>
    )
  }

  _handleSubmit() {
    fetch('/person', {
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
        throw new Error("Person not created");
      }
    }).catch( (error) => {
      console.log(error);
    })
  }

  _packageParams() {
    const id = this.props.householdId

    return {
      "person": {
        "first_name": this.firstName.value,
        "last_name": this.lastName.value,
        "email": this.email.value,
        "gender": this.gender.value,
        "household_id": id
      }
    }
  }  
}
