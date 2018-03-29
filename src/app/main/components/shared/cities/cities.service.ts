import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import { Observable } from 'rxjs';
import { CityModel } from '../../../shared/models/city.model';

@Injectable()
export class CitiesService implements OnInit{

  private _city: CityModel;

  constructor(private _http: HttpClient) { }

  ngOnInit(){

  }

  public getCities(){
    this._http.get('../../../assets/cities.json').subscribe((data) => console.log(data));
  }

}
