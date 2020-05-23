import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactDetailsComponent } from "./contacts/contact-details/contact-details.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";

@NgModule({
  declarations: [AppComponent, ContactDetailsComponent, ContactListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
