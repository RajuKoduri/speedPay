import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerlinksComponent } from './playerlinks.component';

describe('PlayerlinksComponent', () => {
  let component: PlayerlinksComponent;
  let fixture: ComponentFixture<PlayerlinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerlinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
