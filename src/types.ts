export class Weather {
  coord: WeatherCoord;
  main: WeatherMain;
  wind: WeatherWind;
  clouds: WeatherClouds;
  weather: WeatherWeather[];
  sys: WeatherSys;
  visibility: number;
  name: string;
  constructor() {
    this.coord = {
      lon: 0,
      lat: 0,
    };
    this.main = {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    };
    this.wind = {
      speed: 0,
      deg: 0,
      gust: 0,
    };
    this.clouds = {
      all: 0,
    };
    this.weather = [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ];
    this.sys = {
      type: 0,
      id: 0,
      country: "",
      sunrise: 0,
      sunset: 0,
    };
    this.visibility = 0;
    this.name = "";
  }
}

export class WeatherCoord {
  lon: number;
  lat: number;

  constructor() {
    this.lon = 0;
    this.lat = 0;
  }
}

export class WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;

  constructor() {
    this.temp = 0;
    this.feels_like = 0;
    this.temp_min = 0;
    this.temp_max = 0;
    this.pressure = 0;
    this.humidity = 0;
  }
}

export class WeatherWind {
  speed: number;
  deg: number;
  gust: number;

  constructor() {
    this.speed = 0;
    this.deg = 0;
    this.gust = 0;
  }
}

export class WeatherClouds {
  all: number;

  constructor() {
    this.all = 0;
  }
}

export class WeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;

  constructor() {
    this.type = 0;
    this.id = 0;
    this.country = "";
    this.sunrise = 0;
    this.sunset = 0;
  }
}

export class WeatherWeather {
  id: number;
  main: string;
  description: string;
  icon: string;

  constructor() {
    this.id = 0;
    this.main = "";
    this.description = "";
    this.icon = "";
  }
}
export class Location {
  id: number;
  city: string;
  country_code: string;
  country: string;

  constructor() {
    this.id = 0;
    this.city = "";
    this.country_code = "";
    this.country = "";
  }
}

export interface Response {
  place_id: number;
  address: {
    city: string;
    town: string;
    state: string;
    country_code: string;
    country: string;
  };
}
