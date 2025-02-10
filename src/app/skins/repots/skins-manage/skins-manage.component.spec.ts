import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinsManageComponent } from './skins-manage.component';

describe('SkinsManageComponent', () => {
  let component: SkinsManageComponent;
  let fixture: ComponentFixture<SkinsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
