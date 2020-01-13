import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from "../../sharedservice/users.service";
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-admin-all-agents",
  templateUrl: "./admin-all-agents.component.html",
  styleUrls: ["./admin-all-agents.component.css"]
})
export class AdminAllAgentsComponent implements OnInit {
  Users: any = [];
  display = true;
  user_role: any;
  user_id: any;
  error: null;
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;

  constructor(
    public restApi: UsersService,
    public router: Router,
    private SpinnerService: NgxSpinnerService,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.user_role = "Agent";
    this.user_id = this.getUserId();

    this.loadUsers();
  }
  //getting user id
  getUserId() {
    return localStorage.getItem("user_id");
  }
  // Get users list
  loadUsers() {
    return this.restApi.getUserAgents(this.user_role).subscribe((data: {}) => {
      this.Users = data;
      this.display = false;
    });
  }
  // loadUsers() {
  //   return this.restApi.getUserAgents(this.user_role).subscribe(
  //     data => this.handleResponse(data),
  //     error => this.handleError(error)
  //   );
  // }
  handleResponse(data) {
    this.Users = data;

    this.display = false;
  }
  handleError(error) {
    console.log(error);

    this.error = error.Message;
    console.log(this.error);
    this.display = false;
  }

  // Delete user Agent
  deleteUser(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.restApi.deleteAgentUser(id).subscribe(data => {
        this.loadUsers();
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
          this.loadUsers();
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
          this.loadUsers();

          this.toastr.success(" agent successfully de-verified!");
        },
        error => {
          this.toastr.error(error);
        }
      );
    }
  }
}
