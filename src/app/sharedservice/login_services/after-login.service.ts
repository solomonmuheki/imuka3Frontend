import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
//import { Observable } from 'rxjs/Observable';
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable()
export class AfterLoginService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    //return this.Token.loggedIn();
    if (!this.Token.isTokenExpired()) {
      return this.Token.loggedIn();
    }

    this.router.navigate(["/login"]);
    return false;
  }
  constructor(private Token: TokenService, private router: Router) {}
}
