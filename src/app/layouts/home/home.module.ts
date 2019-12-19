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
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
