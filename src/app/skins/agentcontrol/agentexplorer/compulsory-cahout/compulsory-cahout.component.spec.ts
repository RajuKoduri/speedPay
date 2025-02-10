import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompulsoryCahoutComponent } from './compulsory-cahout.component';

describe('AgentCompulsoryCahoutComponent', () => {
  let component: CompulsoryCahoutComponent;
  let fixture: ComponentFixture<CompulsoryCahoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompulsoryCahoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompulsoryCahoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
