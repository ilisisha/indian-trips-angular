export class LocationModel {
  public latitude: number;
  public longitude: number;

  constructor (data: any = {}) {
    this.latitude = data.latitude || null;
    this.longitude = data.longitude || null;
  }
}
