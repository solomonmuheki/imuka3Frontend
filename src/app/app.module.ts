import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
// Forms module
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { HeaderComponent } from "./layouts/home/header/header.component";
import { FooterComponent } from "./layouts/home/footer/footer.component";

import { HomeComponent } from "./layouts/home/home.component";

import { DevTblService } from "./sharedservice/table.service";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutes } from "./app-routing.module";

import { JarwisService } from "./sharedservice/login_services/jarwis.service";
import { TokenService } from "./sharedservice/login_services/token.service";
import { AuthService } from "./sharedservice/login_services/auth.service";
import { AfterLoginService } from "./sharedservice/login_services/after-login.service";
import { BeforeLoginService } from "./sharedservice/login_services/before-login.service";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { Ng2SmartTableModule } from "ng2-smart-table";

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
    SnotifyModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SmartTableModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule
  ],
  providers: [
    JarwisService,
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    { provide: "SnotifyToastConfig", useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
