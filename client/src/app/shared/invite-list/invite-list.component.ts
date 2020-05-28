import { Component, OnInit, Input } from "@angular/core";
import { Invitee } from "src/app/models/invitee.model";

@Component({
  selector: "app-invite-list",
  templateUrl: "./invite-list.component.html",
  styleUrls: ["./invite-list.component.scss"],
})
export class InviteListComponent implements OnInit {
  @Input() inviteeList: Array<Invitee>;
  constructor() {}

  ngOnInit() {}
}
