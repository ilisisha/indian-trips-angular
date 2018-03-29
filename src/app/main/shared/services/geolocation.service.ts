import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CoordinatesModel} from '../models/coordinates.model';

const GEOLOCATION_ERRORS = [
  'Browser does not support location services',
  'You have rejected access to your location',
  'Unable to determine your location',
  'Service timeout has been reached'
];

@Injectable()
export class GeolocationService {

  public getLocation(): Observable<CoordinatesModel> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        console.log(window.navigator.geolocation);
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log("hi");
            // console.log(position.coords.latitude.toString());
            observer.next(new CoordinatesModel({
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
              accuracy: position.coords.accuracy
            }));
            observer.complete();
          },
          (error) => observer.error(GEOLOCATION_ERRORS[+error.code]));
      } else {
        observer.error(GEOLOCATION_ERRORS[0]);
      }
    });

  }

}