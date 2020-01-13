import { Component, OnInit } from "@angular/core";
import { JarwisService } from "../../../sharedservice/login_services/jarwis.service";
import { TokenService } from "../../../sharedservice/login_services/token.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../sharedservice/login_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  user_roles = ["Agent", "Investor"];

  public form = {
    name: null,
    email: null,
    user_role: "Agent",
    status: 0,
    password: null,
    password_confirmation: null
  };
  public error = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router
  ) {}

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Token.handle(
      data.access_token,
      data.expires_in,
      data.user_role,
      data.user_id,
      data.status
    );
    this.router.navigateByUrl("/login");
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {}
}
