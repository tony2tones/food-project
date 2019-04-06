import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../weather.service";
import { Forecast } from './forecast.model';

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"]
})
export class ForecastComponent implements OnInit {
  constructor(private _weatherService: WeatherService) {}
  forecast:Forecast;

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log("<p>Geolocation is not supported by your browser</p>");
      return;
    }
    navigator.geolocation.getCurrentPosition(this.successHandler.bind(this), this.errorHandler.bind(this));
  }

  successHandler(position) {
    this._weatherService
      .getWeather(position.coords.longitude,position.coords.latitude)
      .then(
        response => {
          this.forecast = response;
        });
  }

  errorHandler() {
    console.log("Unable to retrieve your location");
  }
}
