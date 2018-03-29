import { Component, OnInit } from '@angular/core';
import { DirectionsMapDirective } from '../../../route.directive'
import { CitiesService } from '../../shared/services/cities.service';
import { MarkerModel } from '../shared/models/marker.model';
import { GoogleMapsAPIWrapper } from '../../../../../node_modules/@agm/core/services/google-maps-api-wrapper';
import { GeolocationService } from '../../shared/services/geolocation.service';
import { CoordinatesModel } from '../../shared/models/coordinates.model';

declare var google: any;

@Component({
  selector: 'destinations-map',
  templateUrl: 'destinations-map.component.html',
  styleUrls: ['destinations-map.component.scss']
})
export class DestinationsMapComponent implements OnInit {

  private lat: number = 28.6139391;
  private lng: number = 77.20902120000005;
  private markers: MarkerModel[];
  private currentGeolocation: CoordinatesModel;

  // origin ={ lat: 28.6139391, lng: 77.20902120000005 };
  // destination = { lat: 30.3461908, lng: 79.04850590000001};

  constructor(private _citiesService: CitiesService,
              private gmapsApi: GoogleMapsAPIWrapper,
              private geolocationService: GeolocationService) {
    this.markers = [];
    this.markers.push(new MarkerModel({latitude: 28.6139391, longitude: 77.20902120000005}));
    this.markers.push(new MarkerModel({latitude: 15.8496953, longitude: 74.4976741}));
    this.geolocationService.getLocation().
    subscribe((coordinates) => {
      this.currentGeolocation = coordinates;
    });
}

  ngOnInit() {

  }

}
