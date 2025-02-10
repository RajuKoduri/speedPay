import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicalpromotionsettingsComponent } from './periodicalpromotionsettings.component';

describe('PeriodicalpromotionsettingsComponent', () => {
  let component: PeriodicalpromotionsettingsComponent;
  let fixture: ComponentFixture<PeriodicalpromotionsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicalpromotionsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicalpromotionsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
