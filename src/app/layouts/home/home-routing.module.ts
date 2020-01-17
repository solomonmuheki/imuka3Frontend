import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BodyComponent } from "./body/body.component";
import { LoginComponent } from "../signup/login/login.component";
import { RegisterComponent } from "../signup/register/register.component";
import { DealspageComponent } from "../../dealspage/dealspage.component";
import { AboutuspageComponent } from "../aboutuspage/aboutuspage.component";
import { HowItWorksComponent } from "../../how-it-works/how-it-works.component";

import { RequestResetComponent } from "../signup/password/request-reset/request-reset.component";
import { ResponseResetComponent } from "../signup/password/response-reset/response-reset.component";
const routes: Routes = [
  { path: "homepage", component: BodyComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "passwordreset", component: RequestResetComponent },
  { path: "response-password-reset", component: ResponseResetComponent },
  { path: "dealspage", component: DealspageComponent },
  { path: "aboutuspage", component: AboutuspageComponent },
  { path: "how-it-works", component: HowItWorksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
