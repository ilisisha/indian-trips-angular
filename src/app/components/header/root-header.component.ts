import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackgroundService } from '../../shared/services/background.service';

@Component({
  selector: 'app-header',
  templateUrl: 'root-header.component.html',
  styleUrls: ['root-header.component.scss']
})
export class RootHeaderComponent implements OnInit, OnDestroy {

  constructor(public backgroundService: BackgroundService) { }

  ngOnInit() { }

  ngOnDestroy() { }
}
