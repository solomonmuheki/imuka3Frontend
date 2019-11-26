import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
// Forms module
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";


//import { AppRoutes } from "./app.routing.module";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
//import { RegisterComponent } from "./layouts/login/register/register.component";
//import { BodyComponent } from "./layouts/home/body/body.component";
import { HeaderComponent } from "./layouts/home/header/header.component";
import { FooterComponent } from "./layouts/home/footer/footer.component";

import { HomeComponent } from "./layouts/home/home.component";
// import { LoginComponent } from "./layouts/signup/login/login.component";
// import { RegisterComponent } from "./layouts/signup/register/register.component";
import { DevTblService } from "./sharedservice/table.service";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutes } from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,

    // RegisterComponent,
    //BodyComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
