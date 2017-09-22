import React from 'react';
require('../stylesheets/SummaryStyles.scss');

export default class Summary extends React.Component {
  constructor() {
    super();

    this.state = {
      summary: {},
      isLoading: true
    }
  }

  componentWillMount() {
    this._getSummaryData();
  }

  render() {
    return (
      <section id="summary">
        {!this.state.isLoading && this._formatSummary()}
      </section>
    )
  }

  _getSummaryData() {
    const householdId = this.props.householdId;
    
    fetch(`/household/${householdId}/summary`, {
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
      this.setState({
        summary: jsonData,
        isLoading: false
      });
    }).catch( (error) => {
      console.log('Error: ', error);
    });
  }

  _formatSummary() {
    const household = this.state.summary.household

    return (
      <div>
        <h2>Household Summary</h2>
        <div className="summary-data">
          <p>{household.address_1} - {household.address_2}</p>
          <p>{household.city}, {household.state}  {household.zip}</p>
          <p>{household.bedroom_count} Bedroom(s)</p>
        </div>
        <h4>Residents</h4>
        <div>
          {household.residents.map( (r) => {
            return (<div key={r.id}>
              <p>{r.first_name} {r.last_name}</p>
              <p>{r.email}</p>
              <p id="gender">{r.gender}</p>
              <div id="vehicle">
                <h4>Vehicles</h4>
                {r.vehicles.map( (v) => {
                  return (<div key={v.id}>
                    <p>{v.make}</p>
                    <p>{v.model}</p>
                    <p>{v.year}</p>
                    <p id="license">{v.license_plate}</p>
                  </div>)
                })}
              </div>
            </div>)
          })}
        </div>
      </div>
    )
  }  
} 
