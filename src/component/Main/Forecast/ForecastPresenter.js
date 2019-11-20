import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import './Forecast.css';

const Container = styled.div`
  border-radius: 0.25rem;
  .weather_wrapper {
    /* width: 255px; */
  }
  .weatherCard {
    /* width: 15.94rem; */
    height: 128px;
    width: 100%;
    font-family: "Open Sans";
    position: relative;
  }
  .currentTemp {
    width: 50%;
    height: 128px;
    background: rgb(41, 41, 41);
    position: absolute;
    top: 0;
    left: 0;
  }
  .currentWeather {
    width: 50%;
    height: 128px;
    background: rgb(237, 237, 237);
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
  .temp {
    font-size: 50px;
    text-align: center;
    display: block;
    font-weight: 300;
    color: rgb(255, 255, 255);
    padding: 20px 0 0;
  }
  .location {
    color: rgb(255, 255, 255);
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    display: block;
  }
  i {
    /* font-family: weathericons; */
    font-size: 55px;
    background: white;
    display: block;
    padding: 20px 0;
    text-align: center;
    /* top:-300px; */
    height:104px;
  }
  .info {
    width: 100%;
    height: 32px;
    position: absolute;
    padding-top: 4px;
    bottom: 0;
    right: 0;
    background: rgb(42, 178, 234);
    font-weight: 700;
    color: rgb(255, 255, 255);
    text-align: center;
  }
  .rain {
    /* width: 100%; */
    /* position: absolute; */
    font-size: 13px;

    /* top: 3px; */
  }
  .rain::before {
    display: block;
    /* content: '\f04e'; */
    font-family: weathericons;
    font-size: 25px;
    /* left: 6px; */
    /* top: -4px; */
    position: absolute;
  }
  .wind {
    /* width: 100%; */
    /* position: absolute; */
    /* top: 3px; */
  }
  .wind::before {
    display: block;
    /* content: '\f050'; */
    font-family: weathericons;
    font-size: 25px;
    /* left: -10px; */
    position: absolute;
    /* top: 5px; */
  }
  
`;



class ForecastPresenter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const date = new Date();
    const sunrise = new Date(this.props.data.sys.sunrise * 1000); //Convert a Unix timestamp to time
    const sunset = new Date(this.props.data.sys.sunset * 1000);

    if (
      date.getHours() >= sunrise.getHours() &&
      date.getHours() < sunset.getHours()
    ) {
      var weatherIconID = `wi wi-owm-day-${this.props.data.weather[0].id}`;
    } else if (date.getHours() >= sunset.getHours()) {
      var weatherIconID = `wi wi-owm-night-${this.props.data.weather[0].id}`;
    }
    // console.log(this.props.data);
    // console.log(this.props.isLoading)
    return (
      <Container>
        <div className="weather_wrapper">
          <div className="weatherCard">
            <div className="currentTemp">
              <span className="temp">{this.props.temp}&deg;</span>
              <span className="location">{this.props.data.name}</span>
            </div>
            <div className="currentWeather">
              <span className="conditions">
                <i className={weatherIconID}></i>
              </span>
              <div className="info">
                <span className="rain wind">
                  <p>
                    {this.props.data.rain
                      ? `강수량 : ${this.props.data.rain['1h']}mm`
                      : `바람 : ${this.props.data.wind.speed}m/s`}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default ForecastPresenter;
