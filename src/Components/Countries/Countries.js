import React from 'react';
import Input from '../Input/Input';

export default class Countries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEmpty: false,
      isLoading: false,
      errorText: "",
      countries: [],
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(res => this.setState({countries: res, isEmpty: res.length === 0, isLoading: false}))
      .catch(err => this.setState({isLoading: false, errorText: err.message}));
  }

  searchCountry = (countryName) => {
    this.setState({isLoading: true});

    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(res => res.json())
      .then((res) => {
        if (res.status === 404) {
          throw new Error('No Data')
        }
        return res;
      })
      .then(res => this.setState({
        countries: res, isEmpty: res.length === 0,
        isLoading: false, errorText: ""
      }))
      .catch(err => this.setState({isLoading: false, errorText: err.message, countries: []}));
  };

  render() {
    const {isEmpty, isLoading, errorText, countries} = this.state;

    return (
      <div>
        <Input onInputClick={this.searchCountry}/>
        {errorText
          ? <p>{errorText}</p>
          : isEmpty
            ? <p>No Data</p>
            : isLoading
              ? <p>Loading ...</p>
              : countries.map(country => <p key={country.name}>{country.name}</p>)
        }
      </div>
    );
  }
}