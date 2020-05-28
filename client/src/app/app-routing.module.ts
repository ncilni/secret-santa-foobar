import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { OrganizeActivityComponent } from "./pages/organize-activity/organize-activity.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "organize-activity",
    component: OrganizeActivityComponent,
    pathMatch: "full",
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
