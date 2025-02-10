import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpromotionalcodeComponent } from './addpromotionalcode.component';

describe('AddpromotionalcodeComponent', () => {
  let component: AddpromotionalcodeComponent;
  let fixture: ComponentFixture<AddpromotionalcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpromotionalcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpromotionalcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
