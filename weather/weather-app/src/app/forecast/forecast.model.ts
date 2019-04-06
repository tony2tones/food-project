import { Main } from './main.model';
import { Weather } from './weather.model';

export class Forecast {
    public name: string;
    public main: Main;
    public weather: Weather[]
}