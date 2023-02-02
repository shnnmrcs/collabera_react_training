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

  cityInput = createRef();

  searchCity = async event => {
    try {
      event.preventDefault();
      const cityName = this.cityInput.current.value;
      const url = `http://localhost:3000/weatherList?cityName=${cityName}`;
      const res = await fetch(url);
      const json = await res.json();
      const { cityList } = this.state;
      const isListed = json.length > 0 ? cityList.find(item => item.cityName === json[0].cityName) : false;
      console.log(isListed);

      if (!res.ok) {
        throw new Error(json);
      }

      if (json.length === 0) {
        const err = `There is no '${cityName}' in the record.`;
        this.setErr(err);
      } else if (isListed) {
        const err = `'${cityName}' is already in the listed.`;
        this.setErr(err);
      } else {
        this.addCity(json[0]);
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  addCity = city => {
    this.setState(
      ({ cityList }) => ({
        cityList: [...cityList, city],
        error: null,
      }),
      () => {
        this.cityInput.current.value = '';
      },
    );
  };

  setErr = err => {
    console.log(err);
    this.setState(
      () => ({
        error: err,
      }),
      () => {
        this.cityInput.current.value = '';
      },
    );
  };

  clearCity = () => {
    this.setState(
      () => ({
        cityList: [],
        error: null,
      }),
      () => {
        this.cityInput.current.value = '';
      },
    );
  };

  render() {
    // console.log('Weather App');
    const { cityList, error } = this.state;
    const showApp = error?.message !== 'Failed to fetch';

    return (
      <div className="weather">
        <h1 className="weather__title">Weather App</h1>
        {!showApp && <h1>{error?.message}</h1>}
        {showApp && (
          <>
            <WeatherForm ref={this.cityInput} searchCity={this.searchCity} />
            {error != null && <div className="weather_error">{error}</div>}
            <WeatherTable cityList={cityList} />
            {cityList.length > 0 && <WeatherClear clearCity={this.clearCity} />}
          </>
        )}
      </div>
    );
  }
}
