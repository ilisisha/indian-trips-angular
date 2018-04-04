import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/compiler/src/core';
import { CityModel } from '../../../shared/models/city.model';
import { CitiesService } from '../../../shared/services/cities.service';

@Component({
  selector: 'destination-list',
  templateUrl: 'destination-list.component.html',
  styleUrls: ['destination-list.component.scss']
})

export class DestinationListComponent implements OnInit {

  private _destinations: CityModel[];
  private _startCity: string;

  constructor(private _citiesService: CitiesService) {
    // this.citiesService.getCities();
  }

  ngOnInit() {
  }

  private getCities(){
    // this._citiesService.getCities(this._startCity).subscribe(
    //   (destinations) => {
    //     this._destinations = destinations;
    //     this.add();
    //   });
  }

}
