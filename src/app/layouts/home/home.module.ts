import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BodyComponent } from "./body/body.component";
import { LoginComponent } from "../signup/login/login.component";
import { RegisterComponent } from "../signup/register/register.component";
import { SearchFilterComponent } from "./search-filter/search-filter.component";
import { HomeRoutingModule } from "./home-routing.module";
import { AboutuspageComponent } from "../aboutuspage/aboutuspage.component";
import { DealspageComponent } from "../../dealspage/dealspage.component";
import { RequestResetComponent } from "../signup/password/request-reset/request-reset.component";
import { ResponseResetComponent } from "../signup/password/response-reset/response-reset.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoopingRhumbusesSpinnerModule } from "angular-epic-spinners";
import { IntersectingCirclesSpinnerModule } from "angular-epic-spinners";
import { HalfCircleSpinnerModule } from "angular-epic-spinners";

@NgModule({
  declarations: [
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    DealspageComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AboutuspageComponent,
    SearchFilterComponent
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
    ReactiveFormsModule
  ]
})
export class HomeModule {}
