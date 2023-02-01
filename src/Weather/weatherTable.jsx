import React, { memo } from 'react';
import PropTypes from 'prop-types';

function WeatherTable({ cityList }) {
  console.log('WeatherTable render');

  if (cityList.length > 0) {
    return (
      <table className="weather_table">
        <thead>
          <tr>
            <th className="weather_table__th">Name</th>
            <th className="weather_table__th">Temp</th>
            <th className="weather_table__th">Temp Type</th>
          </tr>
        </thead>
        <tbody className="weather_table__tbody">
          {cityList.map(item => (
            <tr key={item.cityName}>
              <td className="weather_table__td">{item.cityName}</td>
              <td className="weather_table__td">{item.temp}</td>
              <td className="weather_table__td">{item.tempType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
}

WeatherTable.propTypes = {
  cityList: PropTypes.arrayOf(
    PropTypes.exact({
      cityName: PropTypes.string,
      temp: PropTypes.number,
      tempType: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(WeatherTable);
