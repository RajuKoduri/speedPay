import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcclubgamesbalanceComponent } from './acclubgamesbalance.component';

describe('AcclubgamesbalanceComponent', () => {
  let component: AcclubgamesbalanceComponent;
  let fixture: ComponentFixture<AcclubgamesbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcclubgamesbalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcclubgamesbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
