import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BackgroundService {

  public onChangeBackground: EventEmitter<string> = new EventEmitter();

  // BackGround Image
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

  private _currentBGImage: string;

  get currentBGImage() { this.setBGImage(); return this._currentBGImage; }

  public setBGImage() {
    const min = 0;
    const max = this.backgroundImages.length - 1;
    const index = Math.floor(Math.random() * (max - min)) + min;
    this._currentBGImage = 'url("../../assets/images/background-image/' + this.backgroundImages[index] + '.jpg")';
    this.onChangeBackground.emit(this._currentBGImage);
  }

}