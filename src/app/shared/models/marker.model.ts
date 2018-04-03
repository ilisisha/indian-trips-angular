export class MarkerModel {
  public image: string;
  public latitude: number;
  public longitude: number;

  constructor (data: any = {}) {
    this.image = data.image || '../../../assets/images/pin-round.png';
    this.latitude = data.latitude || null;
    this.longitude = data.longitude || null;
  }
}
