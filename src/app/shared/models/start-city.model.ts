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
    this.location =  new LocationModel({
      latitude: data.location && data.location.latitude,
      longitude: data.location && data.location.longitude
    });
    this.min = data.min && data.min.map((city) => new CityModel(city)) || [];
    this.average = data.average && data.average.map((city) => new CityModel(city)) || [];
    this.max = data.max && data.max.map((city) => new CityModel(city)) || [];
  }
}
