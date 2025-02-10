import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassbonuslistComponent } from './massbonuslist.component';

describe('MassbonuslistComponent', () => {
  let component: MassbonuslistComponent;
  let fixture: ComponentFixture<MassbonuslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassbonuslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassbonuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
