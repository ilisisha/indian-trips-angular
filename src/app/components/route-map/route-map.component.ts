import { Component, OnInit, Input } from '@angular/core';
import { DirectionsMapDirective } from '../../route.directive';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { LocationModel } from '../../shared/models/location.model';

declare var google: any;

@Component({
  selector: 'app-route-map',
  templateUrl: 'route-map.component.html',
  styleUrls: ['route-map.component.scss']
})
export class RouteMapComponent implements OnInit {


  // test, not for using
  // lat: number = 28.6139391;
  // lng: number = 77.20902120000005;
  //
  // image: Object = {url: '../assets/images/pin-round.png'};

  // origin = { lat: 28.6139391, lng: 77.20902120000005 };
  // destination = { lat: 30.3461908, lng: 79.04850590000001};

  @Input() origin: any;
  @Input() destination: any;


  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() { }

  providers: [GoogleMapsAPIWrapper];

}
