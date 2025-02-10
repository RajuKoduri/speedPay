import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComppointslevelsComponent } from './comppointslevels.component';

describe('ComppointslevelsComponent', () => {
  let component: ComppointslevelsComponent;
  let fixture: ComponentFixture<ComppointslevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComppointslevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComppointslevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
