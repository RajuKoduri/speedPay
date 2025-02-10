import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayermailinglistComponent } from './playermailinglist.component';

describe('PlayermailinglistComponent', () => {
  let component: PlayermailinglistComponent;
  let fixture: ComponentFixture<PlayermailinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayermailinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayermailinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
