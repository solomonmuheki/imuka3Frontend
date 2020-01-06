import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { OfferDealService } from "../../sharedservice/offer-deal.service";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"]
})
export class OffersComponent implements OnInit {
  Deal: any = [];
  Offer: any = [];
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;
  user_id = this.getUserId();
  display = true;
  constructor(
    public restApi: DealrestApiService,
    public router: Router,
    public toastr: ToastrService,
    public offerRestApi: OfferDealService
  ) {}

  ngOnInit() {
    //this.loadDeals();
    this.loadOffers();
  }
  //getting user id
  getUserId() {
    return localStorage.getItem("user_id");
  }

  // Get offer list

  loadOffers() {
    return this.offerRestApi
      .getUserOffers(this.user_id)
      .subscribe((data: {}) => {
        this.Offer = data;
        this.display = false;
      });
  }

  //function called when the button is clicked to corfirm offer
  ConfirmOffer(offerId) {
    let confirmOffer: string = "1";

    const formData = new FormData();

    formData.append("status", confirmOffer);

    // Display the key/value pairs
    let object = {};
    formData.forEach(function(value, key) {
      console.log((object[key] = value));
    });
    let json = JSON.stringify(object);
    //console.log(json)

    if (window.confirm("Are you sure you want to confirm this offer ?")) {
      let id = offerId;

      this.offerRestApi.confirmOffer(id, json).subscribe(
        res => {
          this.router.navigateByUrl("/offers");
          console.log("Content updated successfully!");
          this.toastr.success(" Confirm successfully!");
        },
        error => {
          console.log(error);
          this.toastr.error(error);
        }
      );
    }
  }
  //function called when the button is clicked to corfirm offer
  rejectOffer(offerId) {
    let rejectOffer: string = "3";

    const formData = new FormData();

    formData.append("status", rejectOffer);

    // Display the key/value pairs
    let object = {};
    formData.forEach(function(value, key) {
      console.log((object[key] = value));
    });
    let json = JSON.stringify(object);
    //console.log(json)

    if (window.confirm("Are you sure you want to reject this offer ?")) {
      let id = offerId;

      this.offerRestApi.rejectOffer(id, json).subscribe(
        res => {
          this.router.navigateByUrl("/offers");
          console.log("Content updated successfully!");
          this.toastr.success(" Reject Offer successfully!");
        },
        error => {
          console.log(error);
          this.toastr.error(error);
        }
      );
    }
  }
}
