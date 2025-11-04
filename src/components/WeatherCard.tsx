import { useRef, useState } from 'react';
import type { WeatherResponse } from '../types/weather.interface';
import SearchForm from './SearchForm';
interface WeatherCardProps {
  weather: WeatherResponse;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  isValidCity: boolean;
  city: string;
}
const WeatherCard = ({
  weather,
  setCity,
  isValidCity,
  city,
}: WeatherCardProps) => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const handleTemp = () => setIsCelsius(!isCelsius);
  const inputSearch = useRef<HTMLInputElement | null>(null);
  
  return (
    <section className="bg-white/75 backdrop-blur-md p-2 rounded-3xl shadow-md shadow-white text-center w-lg h-lg border border-white/20">
      <div className='bg-green-500 p-4 rounded-t-2xl'>
      <h2 className="text-lg font-medium mb-0.5 text-black">
        {weather.name}, {weather.sys.country}
      </h2>
      
      <SearchForm inputSearch ={inputSearch} setCity={setCity}/>
      {isValidCity && (
        <p className="mt-2 text-black">
          {city} no existe, intenta con otra ciudad
        </p>
      )}
      </div>
      <div>
        {weather && (
         <div className='bg-amber-100'>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="mx-auto w-28 h-28"
          />
          </div>
        )}
      </div>
      <div className='bg-black/20'>
      <h3 className="capitalize mb-4 text-black text-3xl">
        {weather.weather[0].description}
      </h3>
      </div>
      <ul className="space-y-2 text-sm mb-4 text-left">
        <li className="flex justify-between text-black text-2xl">
          <span>Velocidad del viento:</span>{' '}
          <span>{weather.wind.speed} m/s</span>
        </li>
        <li className="flex justify-between text-black text-2xl">
          <span>Nubes:</span> <span>{weather.clouds.all} %</span>
        </li>
        <li className="flex justify-between text-black text-2xl">
          <span>Presión Admosferica:</span> <span>{weather.main.pressure} hPa</span>
        </li>
        <li className="flex justify-between text-black text-2xl">
          <span>Humedad:</span> <span>{weather.main.humidity} %</span>
        </li>
         <li className="flex justify-between text-black text-2xl">
          <span>Temperatura Minima:</span> <span>{weather.main.temp_min} °C</span>
        </li>

        <li className="flex justify-between text-black text-2xl">
          <span>Visibilidad:</span> <span>{weather.visibility} m/s</span>
        </li>
      </ul>
      <div className='bg-amber-300 rounded-b-2xl p-4'>
      <h2 className="text-4xl font-bold mb-4 text-black">
        {isCelsius
          ? `Temp.Max: ${weather.main.temp.toFixed(1)}°C`
          : `Temp.Max: ${((weather.main.temp * 9) / 5 + 32).toFixed(1)}°F`}
      </h2>
      <button
        className="cursor-pointer bg-white/80 text-black font-semibold px-4 py-2 rounded-xl shadow hover:bg-black hover:text-white transition-all duration-300"
        onClick={handleTemp}
      >
        Cambiar a grados {isCelsius ? '°F' : '°C'}
      </button>
      </div>
    </section>
  );
};
export default WeatherCard;