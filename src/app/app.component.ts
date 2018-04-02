import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocationModel } from './main/components/shared/models/location.model';
import { MarkerModel } from './main/components/shared/models/marker.model';
import { StartCityModel } from './main/components/shared/models/start-city.model';
import { CityModel } from './main/components/shared/models/city.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
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
  private _markers: MarkerModel[];
  private _currentGeolocation: any;
  private _cities: StartCityModel[];
  private _startCity: StartCityModel;
  private _citiesForShow: CityModel[];

  constructor() {}

  ngOnInit() {
    this.setBGImage();
    this.initBGMap();
  }

  ngOnDestroy() {}

  private setBGImage() {
    const min = 0;
    const max = this.backgroundImages.length - 1;
    const index = Math.floor(Math.random() * (max - min)) + min;
    this.currentBGImage = 'url("../../assets/images/background-image/' + this.backgroundImages[index] + '.jpg")';
  }

  private initBGMap() {
    // New Delhi
    this.centerMap = new LocationModel({
      latitude: 28.6139391,
      longitude: 77.20902120000005
    });
  }
}
