import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelchangeshistoryComponent } from './levelchangeshistory.component';

describe('LevelchangeshistoryComponent', () => {
  let component: LevelchangeshistoryComponent;
  let fixture: ComponentFixture<LevelchangeshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelchangeshistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelchangeshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
