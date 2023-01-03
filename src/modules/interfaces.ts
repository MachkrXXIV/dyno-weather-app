interface CoordinateData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface ForecastSimplifiedData {
  classification: string;
  name: string;
  description: string;
  country: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  wind: number;
}

export { CoordinateData, ForecastSimplifiedData };
