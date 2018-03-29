import { Component, OnInit } from '@angular/core';
import { DirectionsMapDirective } from '../../../route.directive'
import { CitiesService } from '../../shared/services/cities.service';
import { MarkerModel } from '../shared/models/marker.model';

@Component({
  selector: 'destinations-map',
  templateUrl: 'destinations-map.component.html',
  styleUrls: ['destinations-map.component.scss']
})
export class DestinationsMapComponent implements OnInit {

  private lat: number = 28.6139391;
  private lng: number = 77.20902120000005;
  private markers: MarkerModel[];

  // origin ={ lat: 28.6139391, lng: 77.20902120000005 };
  // destination = { lat: 30.3461908, lng: 79.04850590000001};

  constructor(private _citiesService: CitiesService) {
    this.markers = [];
    console.log(this.markers);
    this.markers.push(new MarkerModel({latitude: 28.6139391, longitude: 77.20902120000005}));
    this.markers.push(new MarkerModel({latitude: 15.8496953, longitude: 74.4976741}))
}

  ngOnInit() {
    console.log("this");
    this._citiesService.getCities();
  }

}
