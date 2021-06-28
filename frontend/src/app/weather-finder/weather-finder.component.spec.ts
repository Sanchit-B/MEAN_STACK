import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherFinderComponent } from './weather-finder.component';

describe('WeatherFinderComponent', () => {
  let component: WeatherFinderComponent;
  let fixture: ComponentFixture<WeatherFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
