import { Component, OnInit } from "@angular/core";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { OfferDealService } from "../../sharedservice/offer-deal.service";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { MakeOfferComponent } from "../make-offer/make-offer.component";

@Component({
  selector: "app-investor-dashboard",
  templateUrl: "./investor-dashboard.component.html",
  styleUrls: ["./investor-dashboard.component.css"]
})
export class InvestorDashboardComponent implements OnInit {
  Deal: any = [];
  Deal2: any = [];
  Deal3: any = [];
  Offer: any = [];
  Offer2: any = [];
  Offer3: any = [];
  totalOffers: number = 0;
  confirmedOffers: any = 0;
  rejectedOffers: any = 0;
  pendingOffers: any = 0;

  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;
  bsModalRef: BsModalRef;

  constructor(
    public restApi: DealrestApiService,
    public offerRestApi: OfferDealService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadDeals();
    this.loadOffers();
  }

  // Get deal list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;
      // get dates 30 days ago
      let currentDate = new Date();
      let dt2 = currentDate.setDate(currentDate.getDate() - 30);

      //deals created within 30 days from now
      let result = this.Deal.filter(function(item) {
        let itemTime = new Date(item.updated_at).getTime();
        return itemTime >= dt2;
      });
      this.Deal2 = result;
      //Sorting an array of deals with the newest first
      this.Deal2 = result.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      //get the first 6 elements
      this.Deal3 = this.Deal2.slice(0, 5);
    });
  }
  // Get offer list
  loadOffers() {
    return this.offerRestApi.getOffers().subscribe((data: {}) => {
      this.Offer = data;
      this.totalOffers = this.Offer.length;
      //Sorting an array of offers with the newest first
      this.Offer2 = this.Offer.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      //get the first 6 elements
      this.Offer3 = this.Offer2.slice(0, 5);
      //getting number of confirmed offers
      let confirmedOffers1 = this.Offer.filter(status1 => {
        return status1.status == 1;
      });

      this.confirmedOffers = confirmedOffers1.length;
      //getting number of rejected offers
      let rejectedOffers1 = this.Offer.filter(status1 => {
        return status1.status == 2;
      });

      this.rejectedOffers = rejectedOffers1.length;
      //getting number of pending offers
      let pendingOffers1 = this.Offer.filter(status1 => {
        return status1.status == 0;
      });

      this.pendingOffers = pendingOffers1.length;
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
  addNewOffer(id: number) {
    this.bsModalRef = this.bsModalService.show(MakeOfferComponent);
    this.bsModalRef.content.id = id;
    console.log("deal id:", id);
    this.bsModalRef.content.event.subscribe(result => {
      console.log("result:" + result);
      if (result == "OK") {
        this.loadDeals();
      }
    });
  }
}
