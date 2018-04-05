import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { StartCityModel } from '../models/start-city.model';
import { CityModel } from '../models/city.model';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable()
export class CitiesService {

  private _citiesUrl = '../../../../assets/test.json';

  private _allCities: StartCityModel[] = [];
  private _currentGeolocation: any;
  private _startCity: StartCityModel;

  public onFinishLocationSearchEvent = new EventEmitter();
  public onChangeStartCity =  new EventEmitter();
  public onChangeCities: EventEmitter<CityModel[]> = new EventEmitter();

  get allCities() { return this._allCities; }
  get currentGeolocation() { return this._currentGeolocation; }
  get startCity() { return this._startCity; }
  set startCity(value) { this._startCity = new StartCityModel(value)}

  constructor(private _http: Http,
              private _mapsApiLoader: MapsAPILoader) {
  }

  public getCities(): Observable<any> {
    return Observable.create((observer) => {
      this._http
        .get(this._citiesUrl)
        .subscribe((response) => {
          this._allCities = response.json().map(el => new StartCityModel(el));
          observer.next();
          observer.complete();
        });
    });
  }

  public getCurrentLocation() {
    return Observable.create((observer) => {
      if (navigator.geolocation) {

        navigator.geolocation
          .getCurrentPosition(
            (position) => {
              this._currentGeolocation = position;
              console.log('geo', position);
              observer.next(position);
              observer.complete();
            },
            (error) => {
              observer.error('Geolocation search is too long! Please, type in your location.');
              observer.complete();
            }, { timeout: 5000 });

      } else {
        observer.error('Geolocation is not supported by this browser.');
        observer.complete();
      }
    });
  }

  public getClosestCities(): Observable<StartCityModel> {
    // The main city is the nearest city.
    // Calculate the nearest city.
    return Observable.create( (observer) => {
      let allDestination = [];

      this._mapsApiLoader.load().then(() => {
        if (this._currentGeolocation === '') {
          this._startCity = new StartCityModel(this._allCities[0]);
          observer.next(this._startCity);
          observer.complete();
        } else {
          allDestination = this._allCities.map(
            (elem, index) => {
              let dist = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(elem.location.latitude, elem.location.longitude),
                new google.maps.LatLng(
                  this._currentGeolocation.coords.latitude,
                  this._currentGeolocation.coords.longitude
                )
              );
              return { city: elem.city, destination: dist, index: index };
            }
          );
          const min = Math.min.apply(Math, allDestination.map((o) => o.destination));
          const minimalCity = allDestination.find(el => el.destination === min);
          const startCity =  this._allCities.find(el => el.city === minimalCity.city) ;

          if (startCity) {
            this._startCity = new StartCityModel(startCity);
          } else {
            this._startCity = new StartCityModel(this._allCities[0]);
          }

          observer.next(this._startCity);
          observer.complete();
        }
      });
    });
  }


  public changeStartCity(value: string) {
    const city = this._allCities.find(el => el.city === value);
    if (city) {
      this._startCity = city;
    } else {
      this._startCity = new StartCityModel(this._allCities[0]);
    }
  }
}
