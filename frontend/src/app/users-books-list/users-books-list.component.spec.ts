import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBooksListComponent } from './users-books-list.component';

describe('UsersBooksListComponent', () => {
  let component: UsersBooksListComponent;
  let fixture: ComponentFixture<UsersBooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
