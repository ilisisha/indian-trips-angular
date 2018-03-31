import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';

import { DirectionsMapDirective } from './route.directive'

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/components/header/header.component';
import { MainMapComponent } from './main/components/main-map/main-map.component';
import { CitiesService } from './main/components/shared/services/cities.service';
import { MainMenuComponent } from './main/components/main-menu/main-menu.component';
import { GeoLocationService } from './main/shared/services/geolocation.service';
import { DestinationComponent } from './main/components/destination/destination.component';
import { RouteMapComponent } from './main/components/route-map/route-map.component';
import { DestinationListComponent } from './main/components/destination-list/destination-list.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0eUmxV2vedKz0s7CE7cgCT1ALjrN6PXE'
    })
  ],
  providers: [
    CitiesService,
    GoogleMapsAPIWrapper,
    GeoLocationService
  ],
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    MainComponent,
    HeaderComponent,
    MainMapComponent,
    DestinationListComponent,
    MainMenuComponent,
    DestinationComponent,
    RouteMapComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}