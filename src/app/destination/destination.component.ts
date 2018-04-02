import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-destination',
  templateUrl: 'destination.component.html',
  styleUrls: ['destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {

  // Range
  private _rangeTypes = [ 'min', 'average', 'max' ];
  private _range = this._rangeTypes[0];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribe();
  }

  ngOnDestroy() { }

  private subscribe() {
    this._activatedRoute
      .queryParamMap
      .subscribe((params: any) => {
        if (params && params.params && this._rangeTypes.includes(params.params.range)) {
          this._range = params.params.range;
        } else {
          this._range = this._rangeTypes[0];
          this.changeURL();
        }
      });
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

}
