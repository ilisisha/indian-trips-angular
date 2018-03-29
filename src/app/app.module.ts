import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppComponent } from './app.component';

import { DirectionsMapDirective } from './route.directive'

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/components/header/header.component';
import { DestinationsMapComponent } from './main/components/destinations-map/destinations-map.component';
import { DestinationsListComponent } from './main/components/destinations-list/destinations-list.component';
import { CitiesService } from './main/shared/services/cities.service';
import { MainMenuComponent } from './main/components/main-menu/main-menu.component';
import { GeolocationService } from './main/shared/services/geolocation.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0eUmxV2vedKz0s7CE7cgCT1ALjrN6PXE'
    })
  ],
  providers: [
    CitiesService,
    GoogleMapsAPIWrapper,
    GeolocationService
  ],
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    MainComponent,
    HeaderComponent,
    DestinationsMapComponent,
    DestinationsListComponent,
    MainMenuComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}