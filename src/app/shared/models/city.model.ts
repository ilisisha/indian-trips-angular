import { LocationModel } from './location.model';

export class CityModel {
  public id: number;
  public city: string;
  public location: LocationModel;
  public distance: number;
  public hours: string;
  public popular: boolean;
  public explore: boolean;
  public description: string;

  constructor (data: any = {}) {
    this.id = data.id || null;
    this.city = data.city || '';
    this.location =  new LocationModel({
      latitude: data.location.latitude,
      longitude: data.location.longitude
    });
    this.distance = data.distance || null;
    this.hours = data.hours || '';
    this.popular = data.popular || false;
    this.explore = data.explore || false;
    this.description = data.description || '';
  }

}
