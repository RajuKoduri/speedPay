import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokertournamenthistoryComponent } from './pokertournamenthistory.component';

describe('PokertournamenthistoryComponent', () => {
  let component: PokertournamenthistoryComponent;
  let fixture: ComponentFixture<PokertournamenthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokertournamenthistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokertournamenthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
