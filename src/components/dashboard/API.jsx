/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adjustHeaterCooler } from "../../redux/actions";
import { shouldTriggerHeaterOrCooler } from "../../util/vendingMachineUtils";
import PropTypes from "prop-types";


const API_URL = `https://api.weatherapi.com/v1/current.json?key=a130a9a27659464a958230947231710`;
const FIVE_MINS_IN_MS = 5 * 60 * 1000;
const OPTIMUM_DRINK_TEMPERATURE = 4;
//calculations

function API({ cityName }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.machine);
  // Initial weather data is 20 C
  const [weather, setWeather] = useState(20);

  useEffect(() => {
    const getCurrentWeather = () => {
      axios.get(`${API_URL}&q=${cityName}&aqi=no`).then((response) => {
        setWeather(response.data.current.temp_c);
      });
    };
    getCurrentWeather();
    const interval = setInterval(() => {
      getCurrentWeather();
    }, FIVE_MINS_IN_MS);
    return () => clearInterval(interval);
  }, []);

  // Decide whether cooler or heater will be running according to current temperature.
  useEffect(() => {
    if (weather >= OPTIMUM_DRINK_TEMPERATURE) {
      dispatch(adjustHeaterCooler("cool"));
    } else {
      dispatch(adjustHeaterCooler("heat"));
    }
  }, [weather]);

  // Disable cooling and heating when robot arm is on. This is for not to exceed 5 unit/hour energy consumption.
  useEffect(() => {
    if (shouldTriggerHeaterOrCooler(state.components)) {
      if (weather >= OPTIMUM_DRINK_TEMPERATURE) {
        dispatch(adjustHeaterCooler("cool"));
      } else {
        dispatch(adjustHeaterCooler("heat"));
      }
    }
  }, [state.components[3].status]);

  return (
    <div>
      Weather is {weather} °C
    </div>
  );
}

export default API;

API.propTypes = {
  component: PropTypes.string,
};
