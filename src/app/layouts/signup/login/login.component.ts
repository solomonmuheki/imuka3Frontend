import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor() {}

  formdata;
  title = "angularlaravelauth";
  onClickSubmit(data) {
    if (this.formdata.invalid) {
      this.formdata.get("email").markAsTouched();
      this.formdata.get("password").markAsTouched();
    } else {
      alert("Now you are done with angularauthlign Part 1.");
    }
  }
  ngOnInit() {
    /*Login form validation*/
    this.formdata = new FormGroup({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
        ])
      ),
      password: new FormControl("", this.passwordvalidation)
    });
  }
  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 5) {
      return { password: true };
    }
  }
}
