import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBotsComponent } from './import-bots.component';

describe('ImportBotsComponent', () => {
  let component: ImportBotsComponent;
  let fixture: ComponentFixture<ImportBotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
