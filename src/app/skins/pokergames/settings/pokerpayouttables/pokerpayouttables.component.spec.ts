import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerpayouttablesComponent } from './pokerpayouttables.component';

describe('PokerpayouttablesComponent', () => {
  let component: PokerpayouttablesComponent;
  let fixture: ComponentFixture<PokerpayouttablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerpayouttablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerpayouttablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
