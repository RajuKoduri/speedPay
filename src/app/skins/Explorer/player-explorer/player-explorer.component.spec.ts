import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerExplorerComponent } from './player-explorer.component';

describe('PlayerExplorerComponent', () => {
  let component: PlayerExplorerComponent;
  let fixture: ComponentFixture<PlayerExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
