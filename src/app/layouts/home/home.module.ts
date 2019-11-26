import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BodyComponent } from "./body/body.component";
import { LoginComponent } from "../signup/login/login.component";
import { RegisterComponent } from "../signup/register/register.component";
import { SearchFilterComponent } from "./search-filter/search-filter.component";
import { HomeRoutingModule } from "./home-routing.module";
import { AboutuspageComponent } from "../aboutuspage/aboutuspage.component";
import { DealspageComponent } from "../../dealspage/dealspage.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    DealspageComponent,
    AboutuspageComponent,
    SearchFilterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
