import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousebalanceComponent } from './housebalance.component';

describe('HousebalanceComponent', () => {
  let component: HousebalanceComponent;
  let fixture: ComponentFixture<HousebalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousebalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousebalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
