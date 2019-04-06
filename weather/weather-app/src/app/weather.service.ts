import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Forecast } from './forecast/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weather: any;

  apiKey='53f9d8e4213222cf517d86dc406d67fc';
  url='http://api.openweathermap.org/data/2.5/weather';

  constructor(private http:Http ) { }

  getWeather(lon, lat): Promise<Forecast> {
    return this.http.get(
      `${this.url}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
      .toPromise()
      .then(
      response => {
        return response.json() as Forecast;
      })
  }


}
