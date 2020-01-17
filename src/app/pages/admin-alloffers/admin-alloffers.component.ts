import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { OfferDealService } from "../../sharedservice/offer-deal.service";
import { InvestorUpdateOfferComponent } from "../../pages/investor-update-offer/investor-update-offer.component";
import { InvestorDealdetailComponent } from "../../pages/investor-dealdetail/investor-dealdetail.component";

@Component({
  selector: "app-admin-alloffers",
  templateUrl: "./admin-alloffers.component.html",
  styleUrls: ["./admin-alloffers.component.css"]
})
export class AdminAlloffersComponent implements OnInit {
  Offer: any = [];
  title = "offer crude";
  postList: any[] = [];
  bsModalRef: BsModalRef;
  // Pagination parameters.
  p: number = 1;
  count: number = 5;
  display = true;
  user_id: any;
  constructor(
    public offerRestApi: OfferDealService,
    private bsModalService: BsModalService
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
    return this.offerRestApi.getOffers().subscribe((data: {}) => {
      this.Offer = data;
      this.display = false;
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
