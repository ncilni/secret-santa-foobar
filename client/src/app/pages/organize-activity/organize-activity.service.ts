import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrganizeActivityService {
  private activityUrl = `/activity/organize`;

  constructor(private http: HttpClient) {}

  organizeEvent(eventData) {
    console.log(eventData);
    return this.http.post(this.activityUrl, eventData);
  }
}
