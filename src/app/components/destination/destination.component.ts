import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { CitiesService } from '../../shared/services/cities.service';
import { CityModel } from '../../shared/models/city.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-destination',
  templateUrl: 'destination.component.html',
  styleUrls: ['destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {

  // Range
  private _rangeTypes = [ 'min', 'average', 'max' ];
  private _range = this._rangeTypes[0];

  // Subscription
  private _subRouterParams: Subscription;
  private _subStartCity: Subscription;

  // Others
  public cities: CityModel[] = [];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _citiesService: CitiesService) { }

  ngOnInit() {
    this.setCities();
    this.subscribe();
  }

  ngOnDestroy() {
    this._subRouterParams && this._subRouterParams.unsubscribe();
    this._subStartCity && this._subStartCity.unsubscribe();
  }

  private subscribe() {
    this._subRouterParams = this._activatedRoute
      .queryParamMap
      .subscribe((params: any) => {
        this.routerChanged(params);
        this.setCities();
      });

    this._subStartCity = this._citiesService
      .onFinishLocationSearchEvent
      .subscribe(() => {
        this.setCities();
      });
  }

  private routerChanged(params: any) {
    if (params && params.params && this._rangeTypes.includes(params.params.range)) {
      this._range = params.params.range;
    } else {
      this._range = this._rangeTypes[0];
      this.changeURL();
    }
  }

  public setRange(range: string) {
    this._range = range;
    this.changeURL();
  }

  private changeURL() {
    this._router.navigate(
    [this._activatedRoute.snapshot.routeConfig.path],
    {
      queryParams: {range: this._range},
      replaceUrl: true,
    });
  }

  private setCities() {
    if (this._citiesService.startCity) {
      const path = this._activatedRoute.snapshot.routeConfig.path;

      switch (path) {
        case 'popular':
          this.cities = this._citiesService
            .startCity[this._range]
            .filter((city: CityModel) => city.popular);
          break;
        case 'explore':
          this.cities = this._citiesService
            .startCity[this._range]
            .filter((city: CityModel) => city.explore);
          break;
        default:
          this.cities = this._citiesService.startCity[this._range];
      }
    }
  }

}
