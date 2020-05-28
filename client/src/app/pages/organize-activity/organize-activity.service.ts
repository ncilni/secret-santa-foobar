import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrganizeActivityService {
  private activityUrl = `${environment.apiUrl}/activity/organize`;

  constructor(private http: HttpClient) {}

  organizeEvent(eventData) {
    return this.http.post(this.activityUrl, eventData);
  }
}
