import { Component, OnInit } from "@angular/core";

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

@Component({
 moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
