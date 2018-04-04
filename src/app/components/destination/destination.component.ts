import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { CitiesService } from '../../shared/services/cities.service';
import { CityModel } from '../../shared/models/city.model';
import { LocationModel } from '../../shared/models/location.model';
import { Subscription } from 'rxjs/Subscription';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-destination',
  templateUrl: 'destination.component.html',
  styleUrls: ['destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {

  // Range
  private _rangeTypes = [ 'min', 'average', 'max' ];
  private _range = this._rangeTypes[0];

  // CityInfo
  private _mainCityId: number;
  private _locationId: number;

  // Subscription
  private _subRouterParams: Subscription;
  private _subStartCity: Subscription;

  // City Selector
  public value: any = {};
  get items() {
    return this._citiesService.allCities.map(el => {
      return el.city;
    });
  }

  // Modal
  public modalRef: BsModalRef;
  @ViewChild('template') dialogDetail: TemplateRef<any>;

  // Others
  public cities: CityModel[] = [];
  public openedCity: CityModel;
  public isModalOpen = false;

  //router map
  public origin: LocationModel;
  public destination: LocationModel;


  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _citiesService: CitiesService,
              private _modalService: BsModalService) {

    //test for router
    this.origin = new LocationModel(
      { latitude: 28.6139391,
        longitude: 77.20902120000005
      });

    this.destination = new LocationModel({
      latitude: 30.3461908,
      longitude: 79.04850590000001
    });

  }

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
    if (params && params.params.main_city && params.params.location && !this.isModalOpen) {
      setTimeout(() => {
        this._mainCityId = params.params.main_city;
        this._locationId = params.params.location;
        const city = this._citiesService.allCities.find(el => el.id == this._mainCityId);

        if (city) {
          this._citiesService.startCity = city;
          this.setCities();
          this.openedCity = this.cities.find(el => el.id == this._locationId);
          this.modalRef = this._modalService.show(this.dialogDetail);
        } else {
          this.closeModal();
        }
      }, 0);
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

  private changeURLforDialog() {
    this._router.navigate(
      [this._activatedRoute.snapshot.routeConfig.path],
      {
        queryParams: {range: this._range, main_city: this._mainCityId, location: this._locationId},
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

  public refreshValue(value:any):void {
    this.value = value;
    this._citiesService.changeStartCity(value.text);
    this.setCities();
  }

  public openModal(template: TemplateRef<any>, cityID: number) {
    this.isModalOpen = true;
    this.modalRef = this._modalService.show(template);
    this.openedCity = this.cities.find(el => el.id === cityID);

    this._mainCityId = this._citiesService.startCity.id;
    this._locationId = this.openedCity.id;
    this.changeURLforDialog();
  }

  public closeModal() {
    this.isModalOpen = true;
    this._mainCityId = null;
    this._locationId = null;
    this.changeURLforDialog();
    this.modalRef.hide();
  }

}