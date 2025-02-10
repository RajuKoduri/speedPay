import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusabuseComponent } from './bonusabuse.component';

describe('BonusabuseComponent', () => {
  let component: BonusabuseComponent;
  let fixture: ComponentFixture<BonusabuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusabuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusabuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
