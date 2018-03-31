import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../shared/services/cities.service';
import { MarkerModel } from '../shared/models/marker.model';
import { GeoLocationService } from '../../shared/services/geolocation.service';
import { LocationModel } from '../shared/models/location.model';
import { StartCityModel } from '../shared/models/start-city.model';
import { StartCityService } from '../../shared/services/start-city.service';

@Component({
  selector: 'main-map',
  templateUrl: 'main-map.component.html',
  styleUrls: ['main-map.component.scss']
})
export class MainMapComponent implements OnInit {

  private _centerMap: LocationModel;
  private _markers: MarkerModel[];
  private _currentGeolocation: any;

  constructor(
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

  }

  ngAfterViewInit() {
    console.log("1");
    this._startCityService.getStartCity();
  }


}
