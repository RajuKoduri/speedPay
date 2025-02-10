import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSimulatorStrategyComponent } from './create-simulator-strategy.component';

describe('CreateSimulatorStrategyComponent', () => {
  let component: CreateSimulatorStrategyComponent;
  let fixture: ComponentFixture<CreateSimulatorStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSimulatorStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSimulatorStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
