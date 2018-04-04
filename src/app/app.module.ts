import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';

import { DirectionsMapDirective } from './route.directive'

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CitiesService } from './shared/services/cities.service';
import { GeoLocationService } from './main/shared/services/geolocation.service';

// Components
import { RootHeaderComponent } from './components/header/root-header.component';
import { DistanceComponent } from './components/distance/distance.component';
import { PopularComponent } from './components/popular/popular.component';
import { ExploreComponent } from './components/explore/explore.component';
import { DestinationComponent } from './components/destination/destination.component';
import { RouteMapComponent } from './components/route-map/route-map.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    SelectModule,
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
  ],
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    RootHeaderComponent,
    DistanceComponent,
    PopularComponent,
    ExploreComponent,
    RouteMapComponent,
    DestinationComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
