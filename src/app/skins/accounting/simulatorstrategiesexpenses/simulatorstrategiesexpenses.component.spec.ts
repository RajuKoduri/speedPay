import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorstrategiesexpensesComponent } from './simulatorstrategiesexpenses.component';

describe('SimulatorstrategiesexpensesComponent', () => {
  let component: SimulatorstrategiesexpensesComponent;
  let fixture: ComponentFixture<SimulatorstrategiesexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorstrategiesexpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorstrategiesexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
