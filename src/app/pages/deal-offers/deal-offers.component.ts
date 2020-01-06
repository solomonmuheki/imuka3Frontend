import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { OfferDealService } from "../../sharedservice/offer-deal.service";

@Component({
  selector: "app-deal-offers",
  templateUrl: "./deal-offers.component.html",
  styleUrls: ["./deal-offers.component.css"]
})
export class DealOffersComponent implements OnInit {
  deal_id = this.actRoute.snapshot.params["id"];
  Deal: any = [];
  Offer: any = [];
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;

  display = true;
  constructor(
    public restApi: DealrestApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public toastr: ToastrService,
    public offerRestApi: OfferDealService
  ) {}

  ngOnInit() {
    //this.loadDeals();
    this.loadOffers();
  }

  // Get offer list
  loadOffers() {
    return this.offerRestApi.getDealOffers(this.deal_id).subscribe(
      (data: {}) => {
        this.Offer = data;
        this.display = false;
      },
      error => {
        console.log(error.message);
      }
    );
  }
}
