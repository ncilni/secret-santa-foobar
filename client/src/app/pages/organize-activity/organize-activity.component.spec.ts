import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeActivityComponent } from './organize-activity.component';

describe('OrganizeActivityComponent', () => {
  let component: OrganizeActivityComponent;
  let fixture: ComponentFixture<OrganizeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizeActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
