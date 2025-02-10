import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinsReportBySessionsComponent } from './skins-report-by-sessions.component';

describe('SkinsReportBySessionsComponent', () => {
  let component: SkinsReportBySessionsComponent;
  let fixture: ComponentFixture<SkinsReportBySessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinsReportBySessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinsReportBySessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
