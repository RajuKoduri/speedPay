import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokergamesessionsComponent } from './pokergamesessions.component';

describe('PokergamesessionsComponent', () => {
  let component: PokergamesessionsComponent;
  let fixture: ComponentFixture<PokergamesessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokergamesessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokergamesessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
