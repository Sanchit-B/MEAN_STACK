import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListStartComponent } from './survey-list-start.component';

describe('SurveyListStartComponent', () => {
  let component: SurveyListStartComponent;
  let fixture: ComponentFixture<SurveyListStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyListStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
