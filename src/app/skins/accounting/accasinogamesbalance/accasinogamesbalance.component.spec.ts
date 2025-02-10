import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccasinogamesbalanceComponent } from './accasinogamesbalance.component';

describe('AccasinogamesbalanceComponent', () => {
  let component: AccasinogamesbalanceComponent;
  let fixture: ComponentFixture<AccasinogamesbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccasinogamesbalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccasinogamesbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
