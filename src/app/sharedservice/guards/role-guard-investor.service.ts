import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RoleGuardInvestorService implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    let user = localStorage.getItem("user_role");
    if (user === "Investor") {
      return true;
    } else {
      this.router.navigate(["/page-not-found"]);
      return false;
    }
  }
}
