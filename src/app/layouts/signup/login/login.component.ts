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
  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {}

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    console.log("my login data" + data);
    this.Token.handle(data.access_token, data.user_role, data.user_id);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl("/dashboard");
  }

  handleError(error) {
    this.error = error.error.error;
  }
  ngOnInit() {}
}
