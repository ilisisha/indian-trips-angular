import { Directive,  Input} from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {

  @Input() origin: any;
  @Input() destination: any;

  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit(){

    let gm = this.gmapsApi;

    $('#exampleModal').on('shown.bs.modal', function () {
      gm.getNativeMap().then(map => {
        console.log("3");
        google.maps.event.trigger(map, "resize");
        });
    });

    this.gmapsApi.getNativeMap().then(map => {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {lat: this.origin.lat, lng: this.origin.lng},
        destination: {lat: this.destination.lat, lng: this.destination.lng},
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  }

}