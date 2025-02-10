import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAgentComponent } from './create-new-agent.component';

describe('CreateNewAgentComponent', () => {
  let component: CreateNewAgentComponent;
  let fixture: ComponentFixture<CreateNewAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
