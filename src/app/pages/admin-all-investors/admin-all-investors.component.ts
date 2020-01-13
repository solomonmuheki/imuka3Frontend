import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from "../../sharedservice/users.service";

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
  p: Number = 1;
  count: Number = 5;

  constructor(
    public restApi: UsersService,
    private SpinnerService: NgxSpinnerService
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
}
