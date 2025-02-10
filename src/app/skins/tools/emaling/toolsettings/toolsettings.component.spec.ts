import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsettingsComponent } from './toolsettings.component';

describe('ToolsettingsComponent', () => {
  let component: ToolsettingsComponent;
  let fixture: ComponentFixture<ToolsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
