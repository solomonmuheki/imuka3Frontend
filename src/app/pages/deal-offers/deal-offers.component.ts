import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
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
    public restApi: DealrestApiService,
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
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    return this.restApi.getDeal(id).subscribe(
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
}
