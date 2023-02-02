import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const WeatherForm = forwardRef(({ searchCity }, ref) => (
  <form className="weather__form weather_form" onSubmit={searchCity}>
    <input ref={ref} type="text" className="weather_form__input" />
    <button type="submit" className="weather_form__btn">
      Submit
    </button>
  </form>
));

WeatherForm.propTypes = {
  searchCity: PropTypes.func.isRequired,
};

export default memo(WeatherForm);
