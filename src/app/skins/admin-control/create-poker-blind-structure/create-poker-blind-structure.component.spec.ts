import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerBlindStructureComponent } from './create-poker-blind-structure.component';

describe('CreatePokerBlindStructureComponent', () => {
  let component: CreatePokerBlindStructureComponent;
  let fixture: ComponentFixture<CreatePokerBlindStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerBlindStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerBlindStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
