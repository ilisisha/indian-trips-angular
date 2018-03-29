import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsMapComponent } from './main-map.component';

describe('DestinationsMapComponent', () => {
  let component: DestinationsMapComponent;
  let fixture: ComponentFixture<DestinationsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
