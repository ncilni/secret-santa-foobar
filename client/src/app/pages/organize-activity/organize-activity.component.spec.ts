import { InviteListComponent } from "./../../shared/invite-list/invite-list.component";
import { AddInviteeComponent } from "./../../shared/add-invitee/add-invitee.component";
import { ReactiveFormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OrganizeActivityComponent } from "./organize-activity.component";

describe("OrganizeActivityComponent", () => {
  let component: OrganizeActivityComponent;
  let fixture: ComponentFixture<OrganizeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganizeActivityComponent,
        AddInviteeComponent,
        InviteListComponent,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
