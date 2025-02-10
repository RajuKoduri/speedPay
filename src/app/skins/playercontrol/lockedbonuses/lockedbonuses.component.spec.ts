import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedbonusesComponent } from './lockedbonuses.component';

describe('LockedbonusesComponent', () => {
  let component: LockedbonusesComponent;
  let fixture: ComponentFixture<LockedbonusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedbonusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedbonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
