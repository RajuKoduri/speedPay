import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerRakeStructureComponent } from './create-poker-rake-structure.component';

describe('CreatePokerRakeStructureComponent', () => {
  let component: CreatePokerRakeStructureComponent;
  let fixture: ComponentFixture<CreatePokerRakeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerRakeStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerRakeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
