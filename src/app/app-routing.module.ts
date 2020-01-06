import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { HomeComponent } from "./layouts/home/home.component";
import { AfterLoginService } from "./sharedservice/login_services/after-login.service";
import { BeforeLoginService } from "./sharedservice/login_services/before-login.service";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "homepage",
    pathMatch: "full"
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [BeforeLoginService],

    children: [
      {
        path: "",
        loadChildren: "./layouts/home/home.module#HomeModule"
      }
    ]
  },
  // { path: "login", component: LoginComponent },
  // { path: "signup", component: RegisterComponent },
  {
    path: "",
    component: AdminLayoutComponent,

    loadChildren:
      "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
    canActivate: [AfterLoginService]
  },
  {
    path: "**",
    redirectTo: "homepage"
  }
];
