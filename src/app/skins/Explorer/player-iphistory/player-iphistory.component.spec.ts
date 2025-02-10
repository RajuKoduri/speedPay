import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerIphistoryComponent } from './player-iphistory.component';

describe('PlayerIphistoryComponent', () => {
  let component: PlayerIphistoryComponent;
  let fixture: ComponentFixture<PlayerIphistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerIphistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerIphistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
