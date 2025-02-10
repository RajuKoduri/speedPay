import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokertablegroupsComponent } from './pokertablegroups.component';

describe('PokertablegroupsComponent', () => {
  let component: PokertablegroupsComponent;
  let fixture: ComponentFixture<PokertablegroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokertablegroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokertablegroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
