import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { LocationModel } from './shared/models/location.model';
import { CitiesService } from './shared/services/cities.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  // BackGround Image
  public backgroundImages: string[] = [
    "background",
    "background-1",
    "background-2",
    "background-3",
    "background-4",
    "background-5",
    "background-6",
    "background-7",
    "background-8",
    "background-9",
    "background-10",
    "background-11",
    "background-12",
    "background-13",
    "background-14",
    "background-15",
    "background-16",
  ];
  public currentBGImage: string;

  // Main BG Map
  public centerMap: LocationModel;

  constructor(private _citiesService: CitiesService) {}

  ngOnInit() {
    this.setBGImage();
    this.initBGMap();

    this.getCurrentLocation();

    this.getAllCities();
  }

  ngOnDestroy() {}

  private setBGImage() {
    const min = 0;
    const max = this.backgroundImages.length - 1;
    const index = Math.floor(Math.random() * (max - min)) + min;
    this.currentBGImage = 'url("../../assets/images/background-image/' + this.backgroundImages[index] + '.jpg")';
  }

  private initBGMap() {
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
        (message) => {alert(message);
          this.centerMap = new LocationModel({
            latitude: 28.6139391,
            longitude: 77.20902120000005
          });
        }
      );
  }

  private getAllCities() {
    this._citiesService
      .getCities()
      .subscribe(() => {
        console.log('Got all cities');
      });
  }
}
