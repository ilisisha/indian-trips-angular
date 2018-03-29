import { Component, OnInit } from '@angular/core';
import { CityModel } from '../../shared/models/city.model';
import { CitiesService } from '../shared/cities/cities.service';
import { Input } from '@angular/compiler/src/core';

@Component({
  selector: 'destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.scss']
})

export class DestinationsListComponent implements OnInit {

  private destinations: CityModel[];
  @Input searchType: string;

  constructor(private citiesService: CitiesService) {

  }

  ngOnInit() {
  }

}
