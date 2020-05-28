import { OrganizeActivityService } from "./organize-activity.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-organize-activity",
  templateUrl: "./organize-activity.component.html",
  styleUrls: ["./organize-activity.component.scss"],
})
export class OrganizeActivityComponent implements OnInit {
  blankInvitee = {
    email: "",
    name: "",
  };
  inviteeList = [
    {
      email: "",
      name: "",
    },
    {
      email: "",
      name: "",
    },
    {
      email: "",
      name: "",
    },
    {
      email: "",
      name: "",
    },
    {
      email: "",
      name: "",
    },
  ];
  invitationForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private activityService: OrganizeActivityService
  ) {}

  ngOnInit() {
    this.invitationForm = this.fb.group({
      inviter: this.fb.group({
        name: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _,&:'"@()-]*$/g
            ),
          ]),
        ],
        email: [
          "",
          Validators.compose([Validators.required, Validators.email]),
        ],
      }),
      invitationMessage: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
          Validators.pattern(
            /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _,&:'"@()-]*$/g
          ),
        ]),
      ],
    });
  }

  addInvitee(newInvitee) {
    console.log(newInvitee);
    let inviteeIndex = this.inviteeList.findIndex(
      (invitee) => invitee.email === "" && invitee.name === ""
    );
    if (inviteeIndex === -1) {
      this.inviteeList.push(newInvitee);
    } else {
      this.inviteeList[inviteeIndex] = newInvitee;
    }
  }
  checkInvitee() {
    return !!(
      this.inviteeList.filter((invitee) => {
        invitee.email !== "";
      }).length > 2
    );
  }

  sendInvites() {
    this.submitted = false;

    if (this.invitationForm.valid && this.checkInvitee()) {
      this.activityService
        .organizeEvent(this.invitationForm.value)
        .subscribe((res) => {
          console.log("response");
        });
    } else {
      this.submitted = true;
    }
  }
}
