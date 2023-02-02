import React, { Component, createRef } from 'react';
import './weather.css';
import WeatherForm from './weatherForm';
import WeatherTable from './weatherTable';
import WeatherClear from './weatherClear';

export default class Weather extends Component {
  state = {
    dbCityList: null,
    cityList: [],
    error: null,
  };

  cityName = createRef();

  async componentDidMount() {
    this.getDBData();
  }

  getDBData = async () => {
    try {
      const url = 'http://localhost:3000/weatherList';
      const res = await fetch(url);
      const json = await res.json();

      this.setState(() => ({
        dbCityList: json,
      }));

      if (!res.ok) {
        throw new Error(json);
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  searchCity = async event => {
    event.preventDefault();
    const cityName = this.cityName.current.value;
    const { dbCityList, cityList } = this.state;

    const hasDBRecord = dbCityList.find(
      item => item.cityName.toLowerCase() === cityName.toLowerCase(),
    );
    const isListed = cityList.find(
      item => item.cityName.toLowerCase() === cityName.toLowerCase(),
    );

    // There is no DB Record
    if (hasDBRecord === undefined) {
      this.setState(() => ({
        error: `There is no '${cityName}' in the record.`,
      }));
    }
    // User has already listed the city
    if (isListed !== undefined) {
      this.setState(() => ({
        error: `'${cityName}' is already in the listed.`,
      }));
    }

    // Add city to list if found in DB and not yer listed
    if (hasDBRecord !== undefined && isListed === undefined) {
      this.addCity(hasDBRecord);
    }

    this.cityName.current.value = '';
  };

  addCity = city => {
    const add = city;
    this.setState(({ cityList }) => ({
      cityList: [...cityList, add],
      error: null,
    }));
  };

  clearCity = () => {
    this.setState(() => ({
      cityList: [],
    }));
  };

  render() {
    console.log('Weather App');
    const { cityList, error } = this.state;
    console.log(error);

    return (
      <div className="weather">
        <h1 className="weather__title">Weather App</h1>
        <WeatherForm ref={this.cityName} searchCity={this.searchCity} />
        {error != null && <div className="weather_error">{error}</div>}
        <WeatherTable cityList={cityList} />
        {cityList.length > 0 && <WeatherClear clearCity={this.clearCity} />}
      </div>
    );
  }
}
