# Weather App

## Description
Weather App is a simple React Native application that allows users to get weather information for a specific location or their current location. It uses the RapidAPI WeatherAPI to fetch weather data based on user input and current location.

## Features
- Get weather data based on user-entered location.
- Retrieve and display weather data for the current location.
- Request user permission for location access to fetch current location weather data.
- Display weather information using different styles for location weather and current location weather.

## How to Use
1. Clone this repository to your local machine.
2. Navigate to the project directory:


1. Get the API key from the RapidAPI WeatherAPI:

2. Sign up for a free account on RapidAPI (https://rapidapi.com/).
3. Search for the "WeatherAPI" and subscribe to the free plan to get your API key.
4. Replace 'YOUR_API_KEY' with your actual API key in the App.js file. Look for the API_KEY variable at the top of the file and update it with your WeatherAPI key.
5. https://rapidapi.com/weatherapi/api/weatherapi-com/ --- Url

1. Run the app on an Android or iOS device or emulator:

1. Once the app is running, you can use it to get weather information:
2. Enter a location in the input field and click the "Get Weather" button to fetch weather data for that location.
3. Click the "Get Weather for Current Location" button to fetch weather data for your current location (requires location permission).
4. Technologies Used
    React Native: A JavaScript framework for building cross-platform mobile applications.
5. Axios: A promise-based HTTP client for making API requests.
6. expo-location: A library for accessing the device's geolocation.
7. expo-location: A library for handling permissions in React Native applications.


![Weather App Demo](https://github.com/dipeshbansal/react-native-weather-app/blob/main/assets/IMG_0432.PNG?raw=true)
![Weather App Demo 2](https://github.com/dipeshbansal/react-native-weather-app/blob/main/assets/IMG_0431.PNG?raw=true)
