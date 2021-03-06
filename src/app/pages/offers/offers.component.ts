import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr
import { OfferDealService } from "../../sharedservice/offer-deal.service";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"]
})
export class OffersComponent implements OnInit {
  Deal: any = [];
  Offer: any = [];
  allOffers: any = [];
  // Pagination parameters.
  p: number = 1;
  count: number = 5;
  user_id = this.getUserId();
  display = true;
  constructor(
    public restApi: DealRegistrationApiService,
    public router: Router,
    public toastr: ToastrService,
    public offerRestApi: OfferDealService
  ) {}

  ngOnInit() {
    this.loadOffers();
  }
  //getting user id
  getUserId() {
    return localStorage.getItem("user_id");
  }

  // Get offer list

  loadOffers() {
    return this.offerRestApi
      .getDealOffers(this.user_id)
      .subscribe((data: {}) => {
        this.allOffers = data;
        //Sorting an array of offers with the newest first
        this.Offer = this.allOffers.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
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
      object[key] = value;
    });
    let json = JSON.stringify(object);
    //  console.log(json);

    if (window.confirm("Are you sure you want to confirm this offer ?")) {
      let id = offerId;

      this.offerRestApi.confirmOffer(id, json).subscribe(
        res => {
          this.loadOffers();

          this.toastr.success(" Offer Confirmed successfully!");
        },
        error => {
          this.toastr.error(error);
        }
      );
    }
  }
  //function called when the button is clicked to corfirm offer
  rejectOffer(offerId) {
    let rejectOffer: string = "2";

    const formData = new FormData();

    formData.append("status", rejectOffer);

    // Display the key/value pairs
    let object = {};
    formData.forEach(function(value, key) {
      object[key] = value;
    });
    let json = JSON.stringify(object);
    //console.log(json)

    if (window.confirm("Are you sure you want to reject this offer ?")) {
      let id = offerId;

      this.offerRestApi.rejectOffer(id, json).subscribe(
        res => {
          this.loadOffers();

          this.toastr.success("  Offer successfully Reject!");
        },
        error => {
          this.toastr.error(error);
        }
      );
    }
  }
}
