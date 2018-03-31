import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';
import { StartCityModel } from '../../components/shared/models/start-city.model';

declare var google: any;

@Injectable()
export class StartCityService {

  constructor(private mapsApiLoader: MapsAPILoader) { }

   public getStartCity(location: any, cities: any): Observable<StartCityModel> {

    // The main city is the nearest city.
     // Calculate the nearest city.
      return Observable.create( (observer) => {
        let allDestination = [];
        this.mapsApiLoader.load().then(() => {
          if(location === ''){
            observer.next(new StartCityModel(cities[0]));
            observer.complete();
          }else {
            allDestination = cities.map(
              (elem, index) => {
                let dist = google.maps.geometry.spherical.computeDistanceBetween(
                  new google.maps.LatLng(elem.location.latitude, elem.location.longitude),
                  new google.maps.LatLng(
                    location.coords.latitude,
                    location.coords.longitude
                  )
                );
                return { city: elem.city, distination: dist, index: index };
              }
            );
            console.log(allDestination.reduce(
              function(min, current) {
                if(current < min)
                  return current;
                else
                  return min;
              }, 0)
            );
            observer.next(new StartCityModel(allDestination[0]));
            observer.complete();
          }
        });
      // centerMap = data.distances[mainCity.index].info.location;
      // let destinationCities = data.distances[mainCity.index].info[searchRadius];
      // resolve(destinationCities);

    });
  }

}
