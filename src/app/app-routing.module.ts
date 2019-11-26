import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { HomeComponent } from "./layouts/home/home.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "homepage",
    pathMatch: "full"
  },
  {
    path: "",
    component: HomeComponent,
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

    loadChildren: "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
  },
  {
    path: "**",
    redirectTo: "homepage"
  }
];
