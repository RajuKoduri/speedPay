import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcagentsbalanceComponent } from './acagentsbalance.component';

describe('AcagentsbalanceComponent', () => {
  let component: AcagentsbalanceComponent;
  let fixture: ComponentFixture<AcagentsbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcagentsbalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcagentsbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
