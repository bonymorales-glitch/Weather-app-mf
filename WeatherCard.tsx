import { useRef, useState } from 'react';
import type { WeatherResponse } from '../types/Weather.interface';
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputSearch.current?.value.trim()) return;
    setCity(inputSearch.current.value.trim());
  };
  return (
    <section className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-md shadow-white text-center w-80 border border-white/20 hover:scale-105 transition-transform duration-500">
      <h2 className="text-lg font-medium mb-4">
        {weather.name}, {weather.sys.country}
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
        <input
          ref={inputSearch}
          type="search"
          placeholder="Buscar por ciudad..."
          className="px-3 py-2 rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70"
        />
        <button className="cursor-pointer bg-white text-black font-semibold px-4 py-2 rounded-xl shadow hover:bg-black hover:text-white transition-all duration-300">
          Search
        </button>
      </form>
      {isValidCity && (
        <p className="mt-2 text-red-400">
          {city} no existe, intenta con otra ciudad
        </p>
      )}
      <div>
        {weather && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="mx-auto w-28 h-28 drop-shadow-[0_0_10px_white]"
          />
        )}
      </div>
      <h3 className="capitalize mb-4 text-indigo-200">
        {weather.weather[0].description}
      </h3>
      <ul className="space-y-2 text-sm mb-4 text-left">
        <li className="flex justify-between">
          <span>Velocidad del viento:</span>{' '}
          <span>{weather.wind.speed} m/s</span>
        </li>
        <li className="flex justify-between">
          <span>Nubes:</span> <span>{weather.clouds.all} %</span>
        </li>
        <li className="flex justify-between">
          <span>Presión:</span> <span>{weather.main.pressure} hPa</span>
        </li>
        <li className="flex justify-between">
          <span>Humedad:</span> <span>{weather.main.humidity} %</span>
        </li>
      </ul>
      <h2 className="text-4xl font-bold mb-4">
        {isCelsius
          ? `${weather.main.temp.toFixed(1)}°C`
          : `${((weather.main.temp * 9) / 5 + 32).toFixed(1)}°F`}
      </h2>
      <button
        className="cursor-pointer bg-white text-black font-semibold px-4 py-2 rounded-xl shadow hover:bg-black hover:text-white transition-all duration-300"
        onClick={handleTemp}
      >
        Cambiar a {isCelsius ? '°F' : '°C'}
      </button>
    </section>
  );
};
export default WeatherCard;