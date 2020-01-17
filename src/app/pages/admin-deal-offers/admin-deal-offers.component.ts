import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";

import { OfferDealService } from "../../sharedservice/offer-deal.service";

@Component({
  selector: "app-admin-deal-offers",
  templateUrl: "./admin-deal-offers.component.html",
  styleUrls: ["./admin-deal-offers.component.css"]
})
export class AdminDealOffersComponent implements OnInit {
  deal_id = this.actRoute.snapshot.params["id"];
  Deal: any = [];
  Offer: any = [];
  // Pagination parameters.
  p: number = 1;
  count: number = 5;

  display = true;
  companyName: string;
  companyType: string;
  companyIndustry: string;
  image: string;
  telephone: string;
  email: string;
  AmountToRaise: string;
  Address: string;
  created_at: string;
  updated_at: string;
  rating: number;
  constructor(
    public restApi: DealRegistrationApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public toastr: ToastrService,
    public offerRestApi: OfferDealService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.loadDeal();
    this.loadOffers();
  }
  loadDeal() {
    //const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    return this.restApi.getDeal(this.deal_id).subscribe(
      (data: {}) => {
        this.companyName = data[0]["companyName"];
        this.companyType = data[0]["companyType"];
        this.companyIndustry = data[0]["companyIndustry"];
        this.image = data[0]["image"];
        this.telephone = data[0]["telephone"];
        this.email = data[0]["email"];
        this.AmountToRaise = data[0]["AmountToRaise"];
        this.Address = data[0]["Address"];
        this.companyName = data[0]["companyName"];
        this.created_at = data[0]["created_at"];
        this.updated_at = data[0]["updated_at"];
        this.rating = data[0]["rating"];
      },
      error => {
        console.log(error.message);
      }
    );
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
      this.updateDealStatus(this.deal_id);
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

          this.toastr.success("Offer successfully Reject!");
        },
        error => {
          this.toastr.error(error);
        }
      );
    }
  }
  updateDealStatus(dealId) {
    let dealStatus: string = "1";
    const formData = new FormData();
    formData.append("status", dealStatus);
    // Display the key/value pairs
    let object = {};
    formData.forEach(function(value, key) {
      object[key] = value;
    });
    let json = JSON.stringify(object);
    //  console.log(json);
    let id = dealId;
    this.restApi.updateDealStatus(id, json).subscribe(
      res => {
        // this.toastr.success(" Deal status successfully updated!");
      },
      error => {
        this.toastr.error(error);
      }
    );
  }
}
