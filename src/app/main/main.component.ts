import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {

  public backgroundImages: string[] = [
    "background",
    "background-1",
    "background-2",
    "background-3",
    "background-4",
    "background-5",
    "background-6",
    "background-7",
    "background-8",
    "background-9",
    "background-10",
    "background-11",
    "background-12",
    "background-13",
    "background-14",
    "background-15",
    "background-16",
  ];

  private _currentBackgroundImage: string;

  constructor() {
  }

  ngOnInit() {
    this.setBackgroundImage();
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public setBackgroundImage() {
    let backgroundNumber = this.getRandomInt(0, this.backgroundImages.length);
    this._currentBackgroundImage = `../../assets/images/background-image/${this.backgroundImages[backgroundNumber]}`;
  }

}
