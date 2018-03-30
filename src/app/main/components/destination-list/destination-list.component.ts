import { Component, OnInit } from '@angular/core';
import { CityModel } from '../shared/models/city.model';
import { CitiesService } from '../shared/services/cities.service';
import { Input } from '@angular/compiler/src/core';

@Component({
  selector: 'destinations-list',
  templateUrl: 'destination-list.component.html',
  styleUrls: ['destination-list.component.scss']
})

export class DestinationsListComponent implements OnInit {

  private destinations: CityModel[];

  constructor(private citiesService: CitiesService) {

  }

  ngOnInit() {
  }

}
