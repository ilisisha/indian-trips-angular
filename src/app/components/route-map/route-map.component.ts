import { Component, OnInit, Input } from '@angular/core';
import { DirectionsMapDirective } from '../../route.directive';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { LocationModel } from '../../shared/models/location.model';
import { CitiesService } from '../../shared/services/cities.service';

declare var google: any;

@Component({
  selector: 'app-route-map',
  templateUrl: 'route-map.component.html',
  styleUrls: ['route-map.component.scss']
})
export class RouteMapComponent implements OnInit {

  @Input() origin: any;
  @Input() destination: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper,
              private _citiesService: CitiesService) {
  }

  ngOnInit() {

  }

  providers: [GoogleMapsAPIWrapper];

}
