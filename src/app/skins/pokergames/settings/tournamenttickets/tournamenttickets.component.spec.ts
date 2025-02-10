import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentticketsComponent } from './tournamenttickets.component';

describe('TournamentticketsComponent', () => {
  let component: TournamentticketsComponent;
  let fixture: ComponentFixture<TournamentticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
