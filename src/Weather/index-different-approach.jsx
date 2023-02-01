import React, { Component, createRef } from 'react';
import './weather.css';
import WeatherForm from './weatherForm';
import WeatherTable from './weatherTable';
import WeatherClear from './weatherClear';

export default class Weather extends Component {
  state = {
    cityList: [],
    error: null,
  };

  cityName = createRef();

  searchCity = async event => {
    try {
      event.preventDefault();
      const cityName = this.cityName.current.value;
      // const url = `http://localhost:3000/weatherList?cityName=${cityName}`;
      const url = 'http://localhost:3000/weatherList';
      const res = await fetch(url);
      const json = await res.json();

      const compare = json.find(
        item => item.cityName.toLowerCase() === cityName.toLowerCase(),
      );

      //   if (json.length > 0) {
      if (compare) {
        this.addCity(compare);
      } else {
        this.setState(() => ({
          error: `'${cityName}' is not in the Record.`,
        }));
      }
      this.cityName.current.value = '';

      if (!res.ok) {
        throw new Error(json);
      }
    } catch (err) {
      console.log(err);
    }
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

    return (
      <div className="weather">
        <h1 className="weather__title">Weather App</h1>
        <WeatherForm ref={this.cityName} searchCity={this.searchCity} />
        {error != null && <div className="weather_error">{error}</div>}
        <WeatherTable cityList={cityList} />
        <WeatherClear clearCity={this.clearCity} />
      </div>
    );
  }
}
