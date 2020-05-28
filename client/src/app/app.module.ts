import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ParticlesModule } from "angular-particle";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactDetailsComponent } from "./contacts/contact-details/contact-details.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { HomeComponent } from "./pages/home/home.component";
import { OrganizeActivityComponent } from "./pages/organize-activity/organize-activity.component";
import { InviteListComponent } from "./shared/invite-list/invite-list.component";
import { AddInviteeComponent } from "./shared/add-invitee/add-invitee.component";

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    HomeComponent,
    OrganizeActivityComponent,
    InviteListComponent,
    AddInviteeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ParticlesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
