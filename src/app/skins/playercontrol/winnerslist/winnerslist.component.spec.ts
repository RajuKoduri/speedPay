import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerslistComponent } from './winnerslist.component';

describe('WinnerslistComponent', () => {
  let component: WinnerslistComponent;
  let fixture: ComponentFixture<WinnerslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
