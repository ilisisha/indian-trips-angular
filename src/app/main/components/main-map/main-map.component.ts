import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../shared/services/cities.service';
import { MarkerModel } from '../shared/models/marker.model';
import { GeoLocationService } from '../../shared/services/geolocation.service';
import { LocationModel } from '../shared/models/location.model';
import { StartCityModel } from '../shared/models/start-city.model';
import { StartCityService } from '../../shared/services/start-city.service';
import { Observable } from 'rxjs';
import { CityModel } from '../shared/models/city.model';

@Component({
  selector: 'main-map',
  templateUrl: 'main-map.component.html',
  styleUrls: ['main-map.component.scss']
})
export class MainMapComponent implements OnInit {

  private _centerMap: LocationModel;
  private _markers: MarkerModel[];

  private _currentGeolocation: any;
  private _cities: StartCityModel[];
  private _startCity: StartCityModel;
  private _citiesForShow: CityModel[];

  constructor(private _geolocationService: GeoLocationService,
              private _citiesService: CitiesService,
              private _startCityService: StartCityService) {

    // New Delhi
    this._centerMap = new LocationModel({
      latitude: 28.6139391,
      longitude: 77.20902120000005
    });

    this._markers = [];
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
            this._startCity = new StartCityModel(startCity);
            this._citiesForShow = this._startCity.max.map((city) => new CityModel(city));
          }
        );
      },
      (msg) => {
        this._currentGeolocation = '';
        this._startCityService.getStartCity(this._currentGeolocation, this._cities).subscribe(
          (startCity) => {
            this._startCity = new StartCityModel(startCity);
            // this._startCity.max
            this._citiesForShow = this._startCity.max.map((city) => new CityModel(city));
          }
        );
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

  public setMarkers() {
    this._citiesForShow.map((city) => {
      let mark = {
        "latitude": city.location.latitude,
        "longitude": city.location.longitude
      };
      this._markers.push(new MarkerModel(mark));
    });
  }

}
