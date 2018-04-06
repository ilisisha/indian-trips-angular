import { Component, OnInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-route-map',
  templateUrl: 'route-map.component.html',
  styleUrls: ['route-map.component.scss']
})
export class RouteMapComponent implements OnInit {

  @Input() origin: any;
  @Input() destination: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() { }

  providers: [GoogleMapsAPIWrapper];

}
