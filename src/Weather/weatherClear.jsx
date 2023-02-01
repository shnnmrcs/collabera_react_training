import React, { memo } from 'react';
import PropTypes from 'prop-types';

function WeatherClear({ clearCity }) {
  console.log('WeatherClear render');

  return (
    <div className="flex">
      <button type="button" className="btn flex-1" onClick={clearCity}>
        Clear List
      </button>
    </div>
  );
}

WeatherClear.propTypes = {
  clearCity: PropTypes.func.isRequired,
};

export default memo(WeatherClear);
