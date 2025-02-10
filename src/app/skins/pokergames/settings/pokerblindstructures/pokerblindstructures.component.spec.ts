import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerblindstructuresComponent } from './pokerblindstructures.component';

describe('PokerblindstructuresComponent', () => {
  let component: PokerblindstructuresComponent;
  let fixture: ComponentFixture<PokerblindstructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerblindstructuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerblindstructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
