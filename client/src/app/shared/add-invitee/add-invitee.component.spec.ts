import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInviteeComponent } from './add-invitee.component';

describe('AddInviteeComponent', () => {
  let component: AddInviteeComponent;
  let fixture: ComponentFixture<AddInviteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInviteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInviteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
