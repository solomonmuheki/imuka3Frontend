import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { JarwisService } from "../../../sharedservice/login_services/jarwis.service";
import { TokenService } from "../../../sharedservice/login_services/token.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../sharedservice/login_services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  display = false;
  public form = {
    email: null,
    password: null
  };

  public error = null;
  // public error = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {}

  onSubmit() {
    this.display = true;
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.display = false;

    this.Token.handle(
      data.access_token,
      data.expires_in,
      data.user_role,
      data.user_id,
      data.status
    );
    this.Auth.changeAuthStatus(true);
    let user = data.user_role;

    if (user === "Agent") {
      this.router.navigateByUrl("/dashboard");
    }
    if (user === "Investor") {
      this.router.navigateByUrl("/investor-dashboard");
    }
    if (user === "Admin") {
      this.router.navigateByUrl("/admin-dashboard");
    }
  }

  handleError(error) {
    //this.display = false;
    this.error = error.error.error;
    console.log(this.error);
  }
  ngOnInit() {}
}
