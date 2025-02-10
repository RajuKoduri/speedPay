import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokertablespokerhandshistoryComponent } from './pokertablespokerhandshistory.component';

describe('PokertablespokerhandshistoryComponent', () => {
  let component: PokertablespokerhandshistoryComponent;
  let fixture: ComponentFixture<PokertablespokerhandshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokertablespokerhandshistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokertablespokerhandshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
