export class CityModel {
  public id: number;
  public name: string;
  public checked: boolean;

  constructor (data: any = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.checked = data.checked || false;
  }
}
