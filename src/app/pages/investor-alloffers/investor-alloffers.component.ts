import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { OfferDealService } from "../../sharedservice/offer-deal.service";
import { InvestorUpdateOfferComponent } from "../../pages/investor-update-offer/investor-update-offer.component";
import { InvestorDealdetailComponent } from "../../pages/investor-dealdetail/investor-dealdetail.component";
@Component({
  selector: "app-investor-alloffers",
  templateUrl: "./investor-alloffers.component.html",
  styleUrls: ["./investor-alloffers.component.css"]
})
export class InvestorAlloffersComponent implements OnInit {
  Offer: any = [];
  title = "offer crude";
  postList: any[] = [];
  bsModalRef: BsModalRef;
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;

  constructor(
    public offerRestApi: OfferDealService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadOffers();
  }

  // Get offer list
  loadOffers() {
    return this.offerRestApi.getOffers().subscribe((data: {}) => {
      this.Offer = data;
    });
  }

  // Delete offer
  // deleteDeal(id) {
  //   if (window.confirm("Are you sure, you want to delete?")) {
  //     this.restApi.deleteDeal(id).subscribe(data => {
  //       this.loadDeals();
  //     });
  //   }
  // }
  editOffer(offerId: number) {
    this.offerRestApi.changeOfferId(offerId);

    this.bsModalRef = this.bsModalService.show(InvestorUpdateOfferComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == "OK") {
        setTimeout(() => {
          this.loadOffers();
        }, 5000);
      }
    });
  }
  offerDetail(offerId: number) {
    this.offerRestApi.changeOfferId(offerId);

    this.bsModalRef = this.bsModalService.show(InvestorDealdetailComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == "OK") {
        setTimeout(() => {
          this.loadOffers();
        }, 5000);
      }
    });
  }
  // Delete offer
  deleteOffer(id) {
    if (window.confirm("Are you sure, you want to delete this offer?")) {
      this.offerRestApi.deleteOffer(id).subscribe(data => {
        this.loadOffers();
      });
    }
  }
}
