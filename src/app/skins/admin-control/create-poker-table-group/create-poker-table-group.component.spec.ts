import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerTableGroupComponent } from './create-poker-table-group.component';

describe('CreatePokerTableGroupComponent', () => {
  let component: CreatePokerTableGroupComponent;
  let fixture: ComponentFixture<CreatePokerTableGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerTableGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerTableGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
