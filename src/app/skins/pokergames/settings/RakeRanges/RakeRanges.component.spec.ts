/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RakeRangesComponent } from './RakeRanges.component';

describe('RakeRangesComponent', () => {
  let component: RakeRangesComponent;
  let fixture: ComponentFixture<RakeRangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RakeRangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RakeRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
