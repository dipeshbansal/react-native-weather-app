import React, { useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import axios from 'axios';
import * as Location from 'expo-location'

const API_KEY = 'b49d485749mshab1bcba4baf0c9ap114f5ejsn9ed3298ece68'; // Replace with your actual API key

const WeatherInfo = ({ location, temp_c, condition }) => (
  <View style={styles.weatherContainer}>
    <Text style={styles.weatherText}>Location: {location}</Text>
    <Text style={styles.weatherText}>Temperature: {temp_c} °C</Text>
    <Text style={styles.weatherText}>Weather: {condition}</Text>
  </View>
);

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocationWeatherData, setCurrentLocationWeatherData] = useState(null);

  
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };
    
  const getCurrentLocationAndFetchWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    const { latitude, longitude } = currentLocation.coords;
    fetchWeatherDataByLocation(latitude, longitude)
  };

  const fetchWeatherDataByLocation = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
      });
      setCurrentLocationWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setCurrentLocationWeatherData(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        style={[styles.button, !location && styles.disabledButton]} // Apply the 'disabledButton' style when 'location' is empty
        onPress={fetchWeatherData}
        disabled={!location} // Disable the button when 'location' is empty
      >
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={getCurrentLocationAndFetchWeather}
      >
        <Text style={styles.buttonText}>Get Weather for Current Location</Text>
      </TouchableOpacity>

      
      {weatherData && (
        <WeatherInfo
          location={weatherData.location.name}
          temp_c={weatherData.current.temp_c}
          condition={weatherData.current.condition.text}
        />
      )}

      {currentLocationWeatherData && (
        <View style={styles.currentLocationWeatherContainer}>
          <WeatherInfo
            location={currentLocationWeatherData?.location?.name}
            temp_c={currentLocationWeatherData.current.temp_c}
            condition={currentLocationWeatherData.current.condition.text}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
  currentLocationWeatherContainer: {
    backgroundColor: '#e5f5ff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default App;