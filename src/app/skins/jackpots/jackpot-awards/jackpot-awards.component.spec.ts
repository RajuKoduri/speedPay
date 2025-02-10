import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotAwardsComponent } from './jackpot-awards.component';

describe('JackpotAwardsComponent', () => {
  let component: JackpotAwardsComponent;
  let fixture: ComponentFixture<JackpotAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JackpotAwardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
