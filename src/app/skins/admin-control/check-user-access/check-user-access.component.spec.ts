import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUserAccessComponent } from './check-user-access.component';

describe('CheckUserAccessComponent', () => {
  let component: CheckUserAccessComponent;
  let fixture: ComponentFixture<CheckUserAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUserAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUserAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
