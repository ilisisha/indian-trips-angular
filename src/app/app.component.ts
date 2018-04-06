import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { LocationModel } from './shared/models/location.model';
import { CitiesService } from './shared/services/cities.service';
import { MarkerModel } from './shared/models/marker.model';
import { CityModel } from './shared/models/city.model';
import { BackgroundService } from './shared/services/background.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  // Main BG Map
  public centerMap: LocationModel;
  public markers: MarkerModel[];
  public cities: CityModel[] = [];

  public rotate: boolean;

  private currentBGImage: string;

  constructor(public _citiesService: CitiesService,
              private _backgroundService: BackgroundService) {
    this.rotate = false;
  }

  ngOnInit() {

    this.currentBGImage = this._backgroundService.currentBGImage;

    this._backgroundService.onChangeBackground.subscribe((currentBGImage) => {
      this.currentBGImage = currentBGImage;
      console.log(currentBGImage);
    });

    this.initBGMap();

    this.getCurrentLocation();

    this.getAllCities();

    this.setMarkers();
  }

  ngOnDestroy() {}

  private initBGMap() {

    //New Delhi
    this.centerMap = new LocationModel({
      latitude: 28.6139391,
      longitude: 77.20902120000005
    });

    this._citiesService.onChangeStartCity.subscribe(
      () => {
        console.log("change center map");
        this.centerMap = {
          'latitude': this._citiesService.startCity.location.latitude,
          'longitude': this._citiesService.startCity.location.longitude
        };
      }
    );
  }

  private getCurrentLocation() {
    this._citiesService
      .getCurrentLocation()
      .subscribe(
        (data) => {
          console.log('Got current location');
          this._citiesService
            .getClosestCities()
            .subscribe(() => {
              this._citiesService.onFinishLocationSearchEvent.emit();
              this.centerMap = {
                'latitude': this._citiesService.startCity.location.latitude,
                'longitude': this._citiesService.startCity.location.longitude
              };
              console.log("center map by location");
            });
        },
        (message) => {alert(message);}
      );
  }

  private getAllCities() {
    this._citiesService
      .getCities()
      .subscribe(() => {
        console.log('Got all cities');
      });
  }

  private setMarkers() {
    console.log("setMarkes");
    this._citiesService.onChangeCities.subscribe((data) => {
      this.cities = data.cities;
      this.markers = this.cities.map(el => new MarkerModel(
        {
          "latitude": el.location.latitude,
          "longitude": el.location.longitude
        })
      );
    });
  }

  public hideDestinations() {
    this._citiesService.onShowDestinations.emit();
    this.rotate = !this.rotate;
  }
  
}
