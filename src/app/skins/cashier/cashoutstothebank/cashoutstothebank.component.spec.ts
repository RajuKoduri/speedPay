import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutstothebankComponent } from './cashoutstothebank.component';

describe('CashoutstothebankComponent', () => {
  let component: CashoutstothebankComponent;
  let fixture: ComponentFixture<CashoutstothebankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashoutstothebankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutstothebankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
