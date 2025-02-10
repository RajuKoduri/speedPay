/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PokerGamesessionHandsHistoryComponent } from './poker-gamesession-hands-history.component';

describe('PokerGamesessionHandsHistoryComponent', () => {
  let component: PokerGamesessionHandsHistoryComponent;
  let fixture: ComponentFixture<PokerGamesessionHandsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokerGamesessionHandsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerGamesessionHandsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
