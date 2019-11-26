import { Component, OnInit } from "@angular/core";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";

@Component({
  selector: "app-alldeals",
  templateUrl: "./alldeals.component.html",
  styleUrls: ["./alldeals.component.css"]
})
export class AlldealsComponent implements OnInit {
  Deal: any = [];
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;

  constructor(public restApi: DealrestApiService) {}

  ngOnInit() {
    this.loadDeals();
  }

  // Get employees list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;
    });
  }

  // Delete employee
  deleteDeal(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.restApi.deleteDeal(id).subscribe(data => {
        this.loadDeals();
      });
    }
  }
}
