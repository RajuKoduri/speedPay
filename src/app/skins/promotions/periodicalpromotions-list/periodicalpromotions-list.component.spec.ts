import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicalpromotionsListComponent } from './periodicalpromotions-list.component';

describe('PeriodicalpromotionsListComponent', () => {
  let component: PeriodicalpromotionsListComponent;
  let fixture: ComponentFixture<PeriodicalpromotionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicalpromotionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicalpromotionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
