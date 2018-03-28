import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppComponent } from './app.component';

import { DirectionsMapDirective } from './route.directive'

import { AgmCoreModule } from '@agm/core';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/components/header/header.component';
import { DestinationsMapComponent } from './main/components/destinations-map/destinations-map.component';
import { DestinationsListComponent } from './main/components/destinations-list/destinations-list.component';
import { CitiesService } from './main/shared/services/cities.service';
import { MainMenuComponent } from './main/components/main-menu/main-menu.component';

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
    CitiesService
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
  bootstrap: [ AppComponent ]
})
export class AppModule {}