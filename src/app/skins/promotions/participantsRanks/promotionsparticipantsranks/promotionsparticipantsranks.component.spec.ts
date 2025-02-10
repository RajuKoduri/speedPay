import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsparticipantsranksComponent } from './promotionsparticipantsranks.component';

describe('PromotionsparticipantsranksComponent', () => {
  let component: PromotionsparticipantsranksComponent;
  let fixture: ComponentFixture<PromotionsparticipantsranksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsparticipantsranksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsparticipantsranksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
