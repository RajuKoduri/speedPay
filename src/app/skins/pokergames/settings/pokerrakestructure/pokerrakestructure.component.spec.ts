import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerrakestructureComponent } from './pokerrakestructure.component';

describe('PokerrakestructureComponent', () => {
  let component: PokerrakestructureComponent;
  let fixture: ComponentFixture<PokerrakestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerrakestructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerrakestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
