import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerSitnGoComponent } from './create-poker-sitn-go.component';

describe('CreatePokerSitnGoComponent', () => {
  let component: CreatePokerSitnGoComponent;
  let fixture: ComponentFixture<CreatePokerSitnGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerSitnGoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerSitnGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
