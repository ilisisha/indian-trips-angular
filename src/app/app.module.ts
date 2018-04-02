import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';

import { AppComponent } from './app.component';

import { DirectionsMapDirective } from './route.directive'

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CitiesService } from './main/components/shared/services/cities.service';
import { GeoLocationService } from './main/shared/services/geolocation.service';
import { StartCityService } from './main/shared/services/start-city.service';

// Components
import { RootHeaderComponent } from './header/root-header.component';
import { DistanceComponent } from './distance/distance.component';
import { PopularComponent } from './popular/popular.component';
import { ExploreComponent } from './explore/explore.component';
import { DestinationComponent } from './destination/destination.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0eUmxV2vedKz0s7CE7cgCT1ALjrN6PXE',
      libraries: ['geometry']
    })
  ],
  providers: [
    CitiesService,
    GoogleMapsAPIWrapper,
    GeoLocationService,
    StartCityService
  ],
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    RootHeaderComponent,
    DistanceComponent,
    PopularComponent,
    ExploreComponent,

    DestinationComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
