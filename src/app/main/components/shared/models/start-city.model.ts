import { LocationModel } from './location.model';
import { CityModel } from './city.model';

export class StartCityModel {
  public id: number;
  public city: string;
  public location: LocationModel;
  public min: CityModel[];
  public average: CityModel[];
  public max: CityModel[];

  constructor (data: any = {}) {
    this.id = data.id || null;
    this.city = data.city || '';
    this.location =  new LocationModel(
      {
        latitude: data.latitude,
        longitude: data.longitude
      }
    );
    this.min = data.min.map((city) => new CityModel(city));
    this.average = data.average.map((city) => new CityModel(city));
    this.max = data.max.map((city) => new CityModel(city));
  }
}
