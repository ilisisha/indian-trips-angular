import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeoLocationService } from './geolocation.service';
import { CitiesService } from '../../components/shared/services/cities.service';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable()
export class StartCityService {


  private _currentGeolocation: any;
  private _cities: any[];
  // private _mainCities;

  constructor(private _geolocationService: GeoLocationService,
              private _citiesService: CitiesService,
              private gmapsApi: GoogleMapsAPIWrapper,
              private mapsApiLoader: MapsAPILoader) {

  }

   public getStartCity() {
    this._geolocationService.getLocation().subscribe(
      (location) => {
        console.log("2");
        this._currentGeolocation = location;
        this.getCities();
      },
      () => {
        console.log(3);
        this._currentGeolocation = '';
      }
    );

  }

  private getCities() {
    this._citiesService.getCities().subscribe(response => {
      this._cities = response.json();
      this.getDestinationCities().subscribe(
        (startCity) => { console.log(startCity); }
      );
    });
  }

  //Вычисляем ближайший город
  private getDestinationCities(): Observable<any> {

    return Observable.create( (observer) => {
      let allDestination = [];

      this.mapsApiLoader.load().then(() => {
        // debugger;
        allDestination  = this._cities.map((elem, index) =>{
            let dist = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(elem.location.lat, elem.location.lng),
              new google.maps.LatLng(this._currentGeolocation.coords.latitude,
                this._currentGeolocation.coords.longitude)
            );
            return { city: elem.city, distination: dist, index: index };
          }
        );
        observer.next(allDestination[0]);
        observer.complete();
      });

        // centerMap = data.distances[mainCity.index].info.location;
        // let destinationCities = data.distances[mainCity.index].info[searchRadius];
        // resolve(destinationCities);

      }
    );

  }

}
