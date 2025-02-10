import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudplayersComponent } from './fraudplayers.component';

describe('FraudplayersComponent', () => {
  let component: FraudplayersComponent;
  let fixture: ComponentFixture<FraudplayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraudplayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
