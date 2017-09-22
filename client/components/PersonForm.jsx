import React from 'react';

export default class PersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = props.actions.changePage;
  }
  
  render() {
    return(
      <div>
        <form id='person_form'>
          <input type='text' id='first_name' ref='first_name' placeholder='First Name' required></input>
          <input type='text' id="last_name" ref='last_name' placeholder='Last Name' required></input>
          <input type='text' id="email" ref='email' placeholder='Email' required></input>

          <select id='gender' name='gender' ref='gender'>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </form>

        <button onClick={this._handleSubmit.bind(this)}>Next</button>
        <button onClick={this._newForm.bind(this)}>Add Another</button>
      </div>
    )
  }

  _handleSubmit(event) {
    event.preventDefault();

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

  _newForm() {
    console.log('Person New Form');
  }

  _packageParams() {
    const refs = this.refs
    const id   = this.props.householdId

    return {
      "person": {
        "first_name": refs.first_name.value,
        "last_name": refs.last_name.value,
        "email": refs.email.value,
        "gender": refs.gender.value,
        "household_id": id
      }
    }
  }  
}
