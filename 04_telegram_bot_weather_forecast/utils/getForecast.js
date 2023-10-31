import axios from 'axios';

// replace the value below with the Forecast API ID
const forecastApiId = process.env.FORECASTAPIID;

export const getForecast = async (town) => {
  try {
    const { data } = await axios.get(
      'http://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          APPID: forecastApiId,
          units: 'metric',
          cnt: 1,
          q: town,
        },
      }
    );
    let forecast = `Forecast for ${town}`;

    const { visibility, wind } = data.list[0];

    const { temp, pressure, humidity } = data.list[0].main;

    forecast += `\nTemperature: ${temp},`;
    forecast += `\nPressure: ${pressure}, `;
    forecast += `\nHumidity: ${humidity}, `;
    forecast += `\nVisibility: ${visibility}, `;
    forecast += `\nWind speed: ${wind.speed}, `;

    return forecast;
  } catch (error) {
    console.log('Error during using Weather API', error);
  }
};
