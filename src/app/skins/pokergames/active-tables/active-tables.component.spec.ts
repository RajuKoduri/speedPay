import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTablesComponent } from './active-tables.component';

describe('ActiveTablesComponent', () => {
  let component: ActiveTablesComponent;
  let fixture: ComponentFixture<ActiveTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
