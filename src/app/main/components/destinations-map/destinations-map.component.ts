import { Component, OnInit } from '@angular/core';
import { DirectionsMapDirective } from '../../../route.directive'
import { CitiesService } from '../../shared/services/cities.service';

@Component({
  selector: 'destinations-map',
  templateUrl: 'destinations-map.component.html',
  styleUrls: ['destinations-map.component.scss']
})
export class DestinationsMapComponent implements OnInit {

  lat: number = 28.6139391;
  lng: number = 77.20902120000005;

  image: Object = {url: '../../../assets/images/pin-round.png'};

  origin ={ lat: 28.6139391, lng: 77.20902120000005 };
  destination = { lat: 30.3461908, lng: 79.04850590000001};

  constructor(private _citiesService: CitiesService) { }

  ngOnInit() {
    console.log("this");
    this._citiesService.getCities();
  }

}
