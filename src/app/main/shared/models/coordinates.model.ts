export class CoordinatesModel {
  latitude: string | number;
  longitude: string | number;
  accuracy?: number;

  constructor(that?: CoordinatesModel) {
    if (that) {
      this.latitude = +that.latitude;
      this.longitude = +that.longitude;
      this.accuracy = +that.accuracy;
    }
  }
}