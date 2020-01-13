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
    path: "/offers",
    title: "Offers",
    icon: "fa fa-money",
    class: ""
  }
];
export const InvestorRoutes: RouteInfo[] = [
  {
    path: "/investor-dashboard",
    title: "Dashboard ",
    icon: "fa fa-home",
    class: ""
  },
  {
    path: "/investor-alldeals",
    title: "All Deals",
    icon: "fa fa-list",
    class: ""
  },
  {
    path: "/investor-alloffers",
    title: "Offers",
    icon: "fa fa-list",
    class: ""
  }
];
export const AdminRoutes: RouteInfo[] = [
  {
    path: "/admin-dashboard",
    title: "Admin-Dashboard ",
    icon: "fa fa-home",
    class: ""
  },
  {
    path: "/all-deals",
    title: "All Deals",
    icon: "fa fa-list",
    class: ""
  },
  {
    path: "/all-offers",
    title: "All Offers",
    icon: "fa fa-file-o",
    class: ""
  },
  {
    path: "/agents",
    title: "Agents",
    icon: "fa fa-user-circle-o",
    class: ""
  },
  {
    path: "/investors",
    title: "investors",
    icon: "fa fa-user-circle-o",
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
  userRole: string = this.getUserRole();
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) {}
  ngOnInit() {
    if (this.userRole === "Agent") {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else if (this.userRole === "Investor") {
      this.menuInvestorItems = InvestorRoutes.filter(menuItem => menuItem);
    } else if (this.userRole === "Admin") {
      this.menuInvestorItems = AdminRoutes.filter(menuItem => menuItem);
    }
    this.Auth.authStatus.subscribe(value => (this.loggedIn = value));
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
  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl("/home");
  }
}
