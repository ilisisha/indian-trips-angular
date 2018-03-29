import { Component, OnInit } from '@angular/core';
import { DirectionsMapDirective } from '../../../route.directive'
import { CitiesService } from '../../shared/services/cities.service';
import { MarkerModel } from '../shared/models/marker.model';
import { GoogleMapsAPIWrapper } from '../../../../../node_modules/@agm/core/services/google-maps-api-wrapper';
import { GeoLocationService } from '../../shared/services/geolocation.service';

declare var google: any;

@Component({
  selector: 'main-map',
  templateUrl: 'main-map.component.html',
  styleUrls: ['main-map.component.scss']
})
export class MainMapComponent implements OnInit {

  private lat: number = 28.6139391;
  private lng: number = 77.20902120000005;
  private markers: MarkerModel[];
  private currentGeolocation: any;

  constructor(private _citiesService: CitiesService,
              private gmapsApi: GoogleMapsAPIWrapper,
              private geolocationService: GeoLocationService) {

    this.markers = [];
    this.markers.push(new MarkerModel({latitude: 28.6139391, longitude: 77.20902120000005}));
    this.markers.push(new MarkerModel({latitude: 15.8496953, longitude: 74.4976741}));
  }

  ngOnInit() {
    this.geolocationService.getLocation().
    subscribe((location) => {this.currentGeolocation = location; console.log(this.currentGeolocation); });
  }

}
