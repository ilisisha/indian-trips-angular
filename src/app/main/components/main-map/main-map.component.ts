import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../shared/services/cities.service';
import { MarkerModel } from '../shared/models/marker.model';
import { GeoLocationService } from '../../shared/services/geolocation.service';
import { LocationModel } from '../shared/models/location.model';
import { StartCityModel } from '../shared/models/start-city.model';
import { StartCityService } from '../../shared/services/start-city.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'main-map',
  templateUrl: 'main-map.component.html',
  styleUrls: ['main-map.component.scss']
})
export class MainMapComponent implements OnInit {

  private _centerMap: LocationModel;
  private _markers: MarkerModel[];
  private _currentGeolocation: any;

  private _currentGeolocation: any;
  private _cities: any[];
  private _startCity: StartCityModel;

  constructor(private _geolocationService: GeoLocationService,
              private _citiesService: CitiesService,
              private _startCityService: StartCityService) {

    // New Delhi
    this._centerMap = new LocationModel({
      latitude: 28.6139391,
      longitude: 77.20902120000005
    });

    //тестовое
    // this.markers = [];
    // this.markers.push(new MarkerModel({latitude: 28.6139391, longitude: 77.20902120000005}));
    // this.markers.push(new MarkerModel({latitude: 15.8496953, longitude: 74.4976741}));
  }

  ngOnInit() {
    this.getStartCity();
  }

  public getCurrentLocation() {
    let result = new Observable;
    this._geolocationService.getLocation().subscribe(
      (location) => {
        this._currentGeolocation = location;
        this._startCityService.getStartCity(this._currentGeolocation, this._cities).subscribe(
          (startCity) => {
            this._startCity = startCity;
            console.log(this._startCity);
          }
        );
      },
      (msg) => {
        this._currentGeolocation = '';
        console.log(msg);
      }
    );

  }

  public getStartCity() {
    this._citiesService.getCities()
      .subscribe(response => {
        this._cities = response.json();
        this.getCurrentLocation();
      });
  }

}
