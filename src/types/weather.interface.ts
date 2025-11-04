export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number,
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  visibility:number;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

