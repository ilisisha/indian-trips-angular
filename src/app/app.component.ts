import { Component } from '@angular/core';
import { DirectionsMapDirective } from './route.directive'
import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title: string = 'My first AGM project';
  lat: number = 28.6139391;
  lng: number = 77.20902120000005;

  image: Object = {url: '../assets/images/pin-round.png'};

  origin ={ lat: 28.6139391, lng: 77.20902120000005 };
  destination = { lat: 30.3461908, lng: 79.04850590000001};

//   let image = {
//   url: markImage,
//   scaledSize: new google.maps.Size(40, 50),
//   origin: new google.maps.Point(0, 0),
//   anchor: new google.maps.Point(0, 32)
// };
//   let marker = new google.maps.Marker({
//   position:  elem.location,
//   map: destinationsMap,
//   icon: image,
// });

  providers: [GoogleMapsAPIWrapper];

}