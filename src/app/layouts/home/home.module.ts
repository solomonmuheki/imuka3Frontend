import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BodyComponent } from "./body/body.component";
import { LoginComponent } from "../signup/login/login.component";
import { RegisterComponent } from "../signup/register/register.component";
import { HomeRoutingModule } from "./home-routing.module";
import { AboutuspageComponent } from "../aboutuspage/aboutuspage.component";
import { DealspageComponent } from "../../dealspage/dealspage.component";
import { HowItWorksComponent } from "../../how-it-works/how-it-works.component";
import { RequestResetComponent } from "../signup/password/request-reset/request-reset.component";
import { ResponseResetComponent } from "../signup/password/response-reset/response-reset.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AngularMaterialModule } from "../../angular-material/angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoopingRhumbusesSpinnerModule } from "angular-epic-spinners";
import { HalfCircleSpinnerModule } from "angular-epic-spinners";
import { BackToTopComponent } from "../../backtopcomponents/back-to-top.component";

@NgModule({
  declarations: [
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    DealspageComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AboutuspageComponent,
    HowItWorksComponent,
    BackToTopComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule,
    NgbModule,
    NgxSpinnerModule,
    LoopingRhumbusesSpinnerModule,
    HalfCircleSpinnerModule,
    HalfCircleSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class HomeModule {}
