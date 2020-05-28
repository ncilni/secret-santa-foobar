import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Invitee } from "src/app/models/invitee.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-invitee",
  templateUrl: "./add-invitee.component.html",
  styleUrls: ["./add-invitee.component.scss"],
})
export class AddInviteeComponent implements OnInit {
  @Output() inviteeAdded = new EventEmitter<Invitee>();
  newInviteeForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.newInviteeForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });
  }
  addInvitee() {
    if (this.newInviteeForm.valid) {
      this.submitted = false;
      this.inviteeAdded.emit(this.newInviteeForm.value);
      this.newInviteeForm.reset();
    } else {
      this.submitted = true;
    }
  }
}
