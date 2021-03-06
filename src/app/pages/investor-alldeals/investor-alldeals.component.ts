import { Component, OnInit } from "@angular/core";
import { OfferDealService } from "../../sharedservice/offer-deal.service";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
//import { MakeOfferComponent } from "../make-offer/make-offer.component";

@Component({
  selector: "app-investor-alldeals",
  templateUrl: "./investor-alldeals.component.html",
  styleUrls: ["./investor-alldeals.component.css"]
})
export class InvestorAlldealsComponent implements OnInit {
  Deal: any = [];
  Deal2: any = [];
  Deal3: any = [];
  Offer: any = [];
  display = true;
  // Pagination parameters.
  p: number = 1;
  count: number = 5;
  bsModalRef: BsModalRef;
  status = this.getUserStatus();
  //sorting
  key: string = "name"; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(
    public restApi: DealRegistrationApiService,
    public offerRestApi: OfferDealService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadDeals();
    this.loadOffers();
  }

  //get the Investor status from local Storage

  getUserStatus() {
    return localStorage.getItem("status");
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
        let dealStatus = item.status;
        return itemTime >= dt2 && dealStatus == 0;
      });
      this.Deal2 = result;

      //Sorting an array of deals with the newest first
      this.Deal2 = result.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      this.display = false;
    });
  }
  // Get deal list
  loadOffers() {
    return this.offerRestApi.getOffers().subscribe((data: {}) => {
      this.Offer = data;
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
  // addNewOffer(id: number) {
  //   this.bsModalRef = this.bsModalService.show(MakeOfferComponent);
  //   this.bsModalRef.content.id = id;
  //   console.log("deal id:", id);
  //   this.bsModalRef.content.event.subscribe(result => {
  //     console.log("result:" + result);
  //     if (result == "OK") {
  //       this.loadDeals();
  //     }
  //   });
  // }
}
