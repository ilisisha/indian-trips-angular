import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { CitiesService } from '../../shared/services/cities.service';
import { CityModel } from '../../shared/models/city.model';
import { LocationModel } from '../../shared/models/location.model';
import { Subscription } from 'rxjs/Subscription';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackgroundService } from '../../shared/services/background.service';

@Component({
  selector: 'app-destination',
  templateUrl: 'destination.component.html',
  styleUrls: ['destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {

  // Range
  public rangeTypes = [ 'min', 'average', 'max' ];
  public range: any = this.rangeTypes[0];

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

  //route map
  public originRouteMap: LocationModel;
  public destinationRouteMap: LocationModel;

  public popular: boolean = false;
  public explore: boolean = false;

  public showDestinations: boolean;


  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _citiesService: CitiesService,
              private _modalService: BsModalService,
              private _backgroundService: BackgroundService) {
    this.showDestinations = true;
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

    this._citiesService.onShowDestinations.subscribe(() => {
      this.showDestinations = !this.showDestinations;
    })
  }

  private routerChanged(params: any) {
    if (params && params.params && this.rangeTypes.includes(params.params.range)) {
      this.range = params.params.range;
    } else {
      this.range = this.rangeTypes[0];
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
          this.originRouteMap = {
            'latitude': this._citiesService.startCity.location.latitude,
            'longitude': this._citiesService.startCity.location.longitude
          };
          this.destinationRouteMap = {
            'latitude': this.openedCity.location.latitude,
            'longitude': this.openedCity.location.longitude
          };
        } else {
          this.closeModal();
        }
      }, 200);
    }
  }

  public setRange(range: string) {
    this.range = range;
    this.changeURL();
    this._backgroundService.setBGImage();
  }

  private changeURL() {
    this._router.navigate(
    [this._activatedRoute.snapshot.routeConfig.path],
    {
      queryParams: {range: this.range},
      replaceUrl: true,
    });
  }

  private changeURLforDialog() {
    this._router.navigate(
      [this._activatedRoute.snapshot.routeConfig.path],
      {
        queryParams: {range: this.range, main_city: this._mainCityId, location: this._locationId},
        replaceUrl: true,
      });
  }

  private setCities() {
    if (this._citiesService.startCity) {
      const path = this._activatedRoute.snapshot.routeConfig.path;

      switch (path) {
        case 'popular':
          this.cities = this._citiesService
            .startCity[this.range]
            .filter((city: CityModel) => city.popular);
          this.popular = true;
          this.explore = false;
          break;
        case 'explore':
          this.cities = this._citiesService
            .startCity[this.range]
            .filter((city: CityModel) => city.explore);
          this.popular = false;
          this.explore = true;
          break;
        default:
          this.cities = this._citiesService.startCity[this.range];
          this.popular = false;
          this.explore = false;
      }

      this._citiesService.onChangeCities.emit({'cities': this.cities, 'range': this.range});
    }
  }

  public refreshValue(value:any):void {
    this.value = value;
    this._citiesService.changeStartCity(value.text);
    this._citiesService.onChangeStartCity.emit();
    this.setCities();
  }

  public openModal(template: TemplateRef<any>, cityID: number) {
    this.isModalOpen = true;
    this.modalRef = this._modalService.show(template);
    this.openedCity = this.cities.find(el => el.id === cityID);
    this.destinationRouteMap = {
      'latitude': this.openedCity.location.latitude,
      'longitude': this.openedCity.location.longitude
    };
    this.originRouteMap = {
      'latitude': this._citiesService.startCity.location.latitude,
      'longitude': this._citiesService.startCity.location.longitude
    };
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
