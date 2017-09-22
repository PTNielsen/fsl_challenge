import React from 'react';

export default class PersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = props.actions.changePage;
  }
  
  render() {
    return(
      <section>
        <form id='person_form'>
          <label htmlFor='first_name'>First Name: </label>
          <input type='text' id='first_name' ref='first_name' placeholder='First Name' required></input>

          <label htmlFor='last_name'>Last Name: </label>
          <input type='text' id="last_name" ref='last_name' placeholder='Last Name' required></input>

          <label htmlFor='email'>Email: </label>
          <input type='text' id="email" ref='email' placeholder='Email' required></input>

          <label htmlFor='gender'>Gender</label>
          <select id='gender' name='gender' ref='gender'>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </form>

        <button onClick={this._handleSubmit.bind(this)}>Next</button>
        <button onClick={this._newForm.bind(this)}>Add Another</button>
      </section>
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
    }).then( (response) => {;
      return response.json();
    }).then( (response) => {
      this.changePage(this.props.nextPage);
    }).catch( (error) => {
      console.log('Error: ', error);
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
