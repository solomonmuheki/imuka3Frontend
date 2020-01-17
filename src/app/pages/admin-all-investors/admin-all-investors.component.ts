import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from "../../sharedservice/users.service";
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

@Component({
  selector: "app-admin-all-investors",
  templateUrl: "./admin-all-investors.component.html",
  styleUrls: ["./admin-all-investors.component.css"]
})
export class AdminAllInvestorsComponent implements OnInit {
  User: any = [];
  display = true;
  user_id: any;
  user_role: any;
  // Pagination parameters.
  p: number = 1;
  count: number = 5;

  constructor(
    public restApi: UsersService,
    private SpinnerService: NgxSpinnerService,
    public toastr: ToastrService
  ) {
    this.loadInvestors = this.loadInvestors.bind(this);
  }

  ngOnInit() {
    this.user_id = this.getUserId();
    this.user_role = "Investor";

    setTimeout(this.loadInvestors, 2000);
    this.loadInvestors();
  }
  //getting user id
  getUserId() {
    return localStorage.getItem("user_id");
  }
  // Get deal list
  loadInvestors() {
    return this.restApi
      .getUserInvestors(this.user_role)
      .subscribe((data: {}) => {
        this.User = data;

        this.display = false;
      });
  }

  // Delete deal
  deleteDeal(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.restApi.deleteInvestorUser(id).subscribe(data => {
        this.loadInvestors();
      });
    }
  }
  //function called when the button is clicked to verify user
  verifyUser(userId) {
    let verify_User: string = "1";
    const formData = new FormData();
    formData.append("status", verify_User);
    // Display the key/value pairs
    let object = {};
    formData.forEach(function(value, key) {
      console.log((object[key] = value));
    });
    let json = JSON.stringify(object);
    //console.log(json)

    if (window.confirm("Are you sure you want to verify this user ?")) {
      let id = userId;
      this.restApi.verifyUser(id, json).subscribe(
        res => {
          this.loadInvestors();
          //this.router.navigateByUrl("/admin-dashboard");
          this.toastr.success(" verified successfully!");
        },
        error => {
          console.log(error);
          this.toastr.error(error);
        }
      );
    }
  }
  //function called when the button is clicked to verify user
  deverifyUser(userId) {
    let verify_User: string = "0";
    const formData = new FormData();
    formData.append("status", verify_User);
    // Display the key/value pairs
    let object = {};
    formData.forEach(function(value, key) {
      console.log((object[key] = value));
    });
    let json = JSON.stringify(object);
    //console.log(json)

    if (window.confirm("Are you sure you want to de-verify this user ?")) {
      let id = userId;

      this.restApi.verifyUser(id, json).subscribe(
        res => {
          this.loadInvestors();

          this.toastr.success(" agent successfully de-verified!");
        },
        error => {
          this.toastr.error(error);
        }
      );
    }
  }
}
