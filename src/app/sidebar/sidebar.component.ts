import { Component, OnInit } from "@angular/core";
import { AuthService } from "../sharedservice/login_services/auth.service";
import { TokenService } from "../sharedservice/login_services/token.service";
import { Router } from "@angular/router";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "fa fa-home",
    class: ""
  },
  {
    path: "/adddeal",
    title: "Add Deal",
    icon: "fa fa-plus",
    class: ""
  },
  {
    path: "/alldeals",
    title: "All Deals",
    icon: "fa fa-list",
    class: ""
  },
  {
    path: "/dealdetails",
    title: "Bids and Offers",
    icon: "fa fa-money",
    class: ""
  }
];
export const InvestorRoutes: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "fa fa-home",
    class: ""
  },
  {
    path: "/adddeal",
    title: "Add Deal",
    icon: "fa fa-plus",
    class: ""
  },
  {
    path: "/alldeals",
    title: "All Deals",
    icon: "fa fa-list",
    class: ""
  },
  {
    path: "/dealdetails",
    title: "Bids and Offers",
    icon: "fa fa-money",
    class: ""
  }
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  public loggedIn: boolean;
  public menuItems: any[];
  public menuInvestorItems: any[];
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) {}
  ngOnInit() {
    this.Auth.authStatus.subscribe(value => (this.loggedIn = value));

    console.log(this.getToken());

    console.log(this.getUserId());
    let userRole: string = this.getUserRole();
    if (userRole === "Agent") {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else if (userRole === "Investor") {
      this.menuInvestorItems = InvestorRoutes.filter(menuItem => menuItem);
    }
  }
  getToken() {
    return localStorage.getItem("token");
  }
  getUserRole() {
    return localStorage.getItem("user_role");
  }
  getUserId() {
    return localStorage.getItem("user_id");
  }
}
