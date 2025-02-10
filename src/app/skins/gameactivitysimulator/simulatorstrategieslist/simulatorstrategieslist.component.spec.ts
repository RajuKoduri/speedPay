import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorstrategieslistComponent } from './simulatorstrategieslist.component';

describe('SimulatorstrategieslistComponent', () => {
  let component: SimulatorstrategieslistComponent;
  let fixture: ComponentFixture<SimulatorstrategieslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorstrategieslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorstrategieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
