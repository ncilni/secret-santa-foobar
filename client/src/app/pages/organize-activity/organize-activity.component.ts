import { OrganizeActivityService } from "./organize-activity.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

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
  inviteeList: any = [
    {
      email: "",
      name: "",
      assigned: {},
    },
    {
      email: "",
      name: "",
      assigned: {},
    },
    {
      email: "",
      name: "",
      assigned: {},
    },
    {
      email: "",
      name: "",
      assigned: {},
    },
    {
      email: "",
      name: "",
      assigned: {},
    },
  ];
  invitationForm: FormGroup;
  submitted = false;
  showInvalidInvitees: boolean;
  requestPending = false;

  constructor(
    private fb: FormBuilder,
    private activityService: OrganizeActivityService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.invitationForm = this.fb.group({
      inviter: this.fb.group({
        name: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _,&:'."\n@()-]*$/
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
            /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _,&:'."\n@()-]*$/
          ),
        ]),
      ],
    });
  }

  addInvitee(newInvitee) {
    let inviteeIndex = this.inviteeList.findIndex(
      (invitee) => invitee.email === "" && invitee.name === ""
    );
    if (inviteeIndex === -1) {
      this.inviteeList.push(newInvitee);
    } else {
      this.inviteeList[inviteeIndex] = newInvitee;
    }
  }

  sendInvites() {
    this.submitted = false;
    let actualList = this.inviteeList.filter((invitee) => invitee.email !== "");
    actualList.push(this.invitationForm.get("inviter").value);
    if (this.invitationForm.valid) {
      if (actualList.length >= 2) {
        this.showInvalidInvitees = false;
        this.requestPending = true;
        this.activityService
          .organizeEvent({ ...this.invitationForm.value, invitees: actualList })
          .subscribe(
            (res: any) => {
              if (res.success) {
                this.showSuccess("We have an invite to your Invitees!");
                this.invitationForm.reset();
              } else {
                this.showFailure(
                  "There was an error while sending your invites! Please try later."
                );
                this.invitationForm.reset();
              }
            },
            (err) => {
              this.showFailure(
                "There was an error while sending your invites! Please try later."
              );
              this.invitationForm.reset();
            },
            () => (this.requestPending = false)
          );
      } else {
        this.showInvalidInvitees = true;
      }
    } else {
      this.submitted = true;
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message, "Success");
  }

  showFailure(message: string) {
    this.toastr.error(message, "Error");
  }
}
