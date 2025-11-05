import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Coords } from './types/coords.interface';
import WeatherCard from './components/WeatherCard';
import type { WeatherResponse } from '../src/types/weather.interface';
import Loader from './components/Loader';
function App() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [city, setCity] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [callToActionMsg, setCallToActionMsg] = useState<boolean>(false);
  const [isValidCity, setIsValidCity] = useState<boolean>(false);
  /*const [background, setBackground] = useState<string>('default');*/
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if (!coords) return;
    const API_KEY = 'ca3d94ccf23245c082753c721bb08f78';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`;
    axios
      .get<WeatherResponse>(url)
      .then((res) => {
        setWeather(res.data);
        setIsValidCity(false);
        /*setBackground(res.data.weather[0].main);*/
      })
      .catch((err) => {
        console.error(err);
        setIsValidCity(true);
      })
      .finally(() => setIsLoading(false));
  }, [coords, city]);
  const getLocation = () => {
    const timer = setTimeout(() => setCallToActionMsg(true), 3000);
    const success = (position: GeolocationPosition) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };
    const error = (err: GeolocationPositionError) => {
      console.error('No se puede obtener ubicación:', err.message);
      setIsLoading(false);
      setErrorMsg(
        'No se puede obtener ubicación, por favor acepta los permisos',
      );
    };
    navigator.geolocation.getCurrentPosition(success, error);
    return () => clearTimeout(timer);
  };
  const objStyles = {
    /*backgroundImage: `url(../piblic/img/${background}.jpg)`,*/
    backgroundImage: `url(/img/fondo1.jpg)`
  };
  return (
    <main
    style={objStyles}  
      className="min-h-screen flex justify-center items-center bg-slate-900 text-white flex-col bg-no-repeat bg-cover opacity-80"
    >
      <h1 className="text-4xl font-bold mb-12 text-black shadow-gray-700">Weather Aplicacion</h1>
      {isLoading && (
        <>
          <Loader />
          {callToActionMsg && (
            <p className="text-black mt-2 animate-pulse text-xl text-center">
              Activa la ubicación, por favor, para continuar
            </p>
          )}
        </>
      )}
      {errorMsg && (
        <div>
          <p>{errorMsg}</p>
        </div>
      )}
      {weather && (
        <WeatherCard
          weather={weather}
          setCity={setCity}
          isValidCity={isValidCity}
          city={city}
        />
      )}
    </main>
  );
}
export default App;