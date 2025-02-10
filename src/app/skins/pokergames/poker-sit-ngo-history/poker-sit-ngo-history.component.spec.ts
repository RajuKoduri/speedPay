import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerSitNgoHistoryComponent } from './poker-sit-ngo-history.component';

describe('PokerSitNgoHistoryComponent', () => {
  let component: PokerSitNgoHistoryComponent;
  let fixture: ComponentFixture<PokerSitNgoHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerSitNgoHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerSitNgoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
