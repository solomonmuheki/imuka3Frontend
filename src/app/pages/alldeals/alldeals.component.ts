import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";

@Component({
  selector: "app-alldeals",
  templateUrl: "./alldeals.component.html",
  styleUrls: ["./alldeals.component.css"]
})
export class AlldealsComponent implements OnInit {
  Deal: any = [];
  allDeal: any = [];
  display = true;
  user_id: any;
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;

  constructor(
    public restApi: DealRegistrationApiService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.loadDeals = this.loadDeals.bind(this);
  }

  ngOnInit() {
    this.user_id = this.getUserId();

    setTimeout(this.loadDeals, 2000);
    this.loadDeals();
  }
  //getting user id
  getUserId() {
    return localStorage.getItem("user_id");
  }
  // Get deal list
  loadDeals() {
    return this.restApi.getUserDeals(this.user_id).subscribe((data: {}) => {
      this.allDeal = data;
      //Sorting an array of deals with the newest first
      this.Deal = this.allDeal.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      this.display = false;
    });
  }

  // Delete deal
  deleteDeal(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.restApi.deleteDeal(id).subscribe(data => {
        this.loadDeals();
      });
    }
  }
}
