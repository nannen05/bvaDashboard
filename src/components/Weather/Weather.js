import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import './weather.css';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currenWeatherEnpoint: 'http://api.openweathermap.org/data/2.5/weather',
        forecastWeatherEnpoint: 'http://api.openweathermap.org/data/2.5/forecast',
        cities: [
            {name: 'San Diego', id: 5391811},
            {name: 'Columbus', id: 4188985},
            {name: 'Philadelphia', id: 4560349}
        ],
        cityWeatherData: [],
        cityForecastData: [],
        cityWeatherLoading: null,
        cityForecastLoading: null,
    };
  }

  componentDidMount() {
    for (let i = 0; i < this.state.cities.length; i++) {
        this.fetchCurrentWeather(this.state.cities[i])
        this.fetchForecastWeather(this.state.cities[i])
    } 
  }

  kelvinToFahrenheit = (number) => {
      return (number - 273.15) * 9/5 + 32
  }

  fetchCurrentWeather = async (city) => {
    const url = `${this.state.currenWeatherEnpoint}?id=${city.id}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        this.setState({ cityWeatherData: [...this.state.cityWeatherData, json ] })
    } catch (error) {
        console.log(error);
    } finally {
        this.setState({ cityWeatherLoading: true })
    }
  }

  fetchForecastWeather = async (city) => {
    const url = `${this.state.forecastWeatherEnpoint}?id=${city.id}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        this.setState({ cityForecastData: [...this.state.cityForecastData, json ] })
        console.log(this.state.cityForecastData)
    } catch (error) {
        console.log(error);
    } finally {
        this.setState({ cityForecastLoading: true })
    }
  }

  buildWeatherCard(index, currentWeather = [], forecastWeather) {
     const ns = 'weather-card'
     console.log(forecastWeather)
     return (
         <div className={ns} key={this.state.cities[index].id}>
            <div className={`${ns}__column`}>
                <div className={`${ns}__header`}>
                    <div className={`${ns}__eyebrow`}>
                        {currentWeather.weather[0].main}
                    </div>
                    <div className={`${ns}__subtitle`}>
                        {currentWeather.name}
                    </div>
                    <div className={`${ns}__title`}>
                        {this.kelvinToFahrenheit(currentWeather.main.temp).toFixed()}
                    </div>
                </div>
            </div>
            <div className={`${ns}__column`}>
                <div className={`${ns}__table`}>
                    <div className={`${ns}__table--header`}>
                        Time
                    </div>
                    {
                        forecastWeather.list.slice(0,12).map((item, i) => {
                            return (
                                <div className={`${ns}__table--row`} key={i}>
                                    <div className={`${ns}__table--column`}>{forecastWeather.list[i].dt_txt}</div>
                                    <div className={`${ns}__table--column`}>{forecastWeather.list[i].weather[0].icon}</div>
                                    <div className={`${ns}__table--column`}>{this.kelvinToFahrenheit(forecastWeather.list[i].main.temp).toFixed()}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
         </div>
     )
  }

  render() {
    return (
      <section className="weather">
            {
                this.state.cityWeatherData.length === this.state.cities.length 
                && this.state.cityForecastData.length === this.state.cities.length
                && this.state.cityWeatherData != null
                && this.state.cityForecastData != null
                ? (
                    this.state.cities.map((item, i) => {
                        return this.buildWeatherCard(i, this.state.cityWeatherData[i], this.state.cityForecastData[i])
                    })
                )
                : 'Loading...'
            }
      </section>
    );
  }
}

export default withRouter(connect(null, null)(Weather));