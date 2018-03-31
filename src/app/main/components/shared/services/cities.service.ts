import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class CitiesService {

  private _citiesUrl: string;

  constructor(private _http: Http) {
    this._citiesUrl = "../../../../assets/test.json";
  }

  public getCities() {
    return this._http.get(this._citiesUrl);
  }

}
