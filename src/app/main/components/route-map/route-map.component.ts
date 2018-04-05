import { Component, OnInit } from '@angular/core';
import { DirectionsMapDirective } from '../../../route.directive';
import { GoogleMapsAPIWrapper } from '@agm/core';

declare var google: any;

@Component({
  selector: 'route-map',
  templateUrl: 'route-map.component.html',
  styleUrls: ['route-map.component.scss']
})
export class RouteMapComponent implements OnInit {

  image: Object = {url: '../assets/images/pin-round.png'};

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {

  }

  providers: [GoogleMapsAPIWrapper];

}
