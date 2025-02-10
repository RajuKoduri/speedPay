import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokertournamentsComponent } from './pokertournaments.component';

describe('PokertournamentsComponent', () => {
  let component: PokertournamentsComponent;
  let fixture: ComponentFixture<PokertournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokertournamentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokertournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
