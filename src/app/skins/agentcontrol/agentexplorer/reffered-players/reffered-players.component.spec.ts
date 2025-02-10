import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferedPlayersComponent } from './reffered-players.component';

describe('RefferedPlayersComponent', () => {
  let component: RefferedPlayersComponent;
  let fixture: ComponentFixture<RefferedPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferedPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
