import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorstrategyadjustmetsComponent } from './simulatorstrategyadjustmets.component';

describe('SimulatorstrategyadjustmetsComponent', () => {
  let component: SimulatorstrategyadjustmetsComponent;
  let fixture: ComponentFixture<SimulatorstrategyadjustmetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorstrategyadjustmetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorstrategyadjustmetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
