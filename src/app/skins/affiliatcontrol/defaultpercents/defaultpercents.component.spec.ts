import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultpercentsComponent } from './defaultpercents.component';

describe('DefaultpercentsComponent', () => {
  let component: DefaultpercentsComponent;
  let fixture: ComponentFixture<DefaultpercentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultpercentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultpercentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
