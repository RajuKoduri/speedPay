import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokertableshistoryComponent } from './pokertableshistory.component';

describe('PokertableshistoryComponent', () => {
  let component: PokertableshistoryComponent;
  let fixture: ComponentFixture<PokertableshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokertableshistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokertableshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
