import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerTouranamentComponent } from './create-poker-touranament.component';

describe('CreatePokerTouranamentComponent', () => {
  let component: CreatePokerTouranamentComponent;
  let fixture: ComponentFixture<CreatePokerTouranamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerTouranamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerTouranamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
