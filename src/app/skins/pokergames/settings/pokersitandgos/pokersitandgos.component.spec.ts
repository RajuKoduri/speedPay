import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokersitandgosComponent } from './pokersitandgos.component';

describe('PokersitandgosComponent', () => {
  let component: PokersitandgosComponent;
  let fixture: ComponentFixture<PokersitandgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokersitandgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokersitandgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
