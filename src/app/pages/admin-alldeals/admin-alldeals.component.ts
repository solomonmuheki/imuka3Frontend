import { Component, OnInit } from "@angular/core";
import { OfferDealService } from "../../sharedservice/offer-deal.service";
import { OrderPipe } from "ngx-order-pipe";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
@Component({
  selector: "app-admin-alldeals",
  templateUrl: "./admin-alldeals.component.html",
  styleUrls: ["./admin-alldeals.component.css"]
})
export class AdminAlldealsComponent implements OnInit {
  Deal: any = [];
  Offer: any = [];
  display = true;
  // Pagination parameters.
  p: number = 1;
  count: number = 5;
  bsModalRef: BsModalRef;

  //sorting
  order: string = "Deal.name"; //set default
  reverse: boolean = false;

  constructor(
    public restApi: DealRegistrationApiService,
    public offerRestApi: OfferDealService,
    private bsModalService: BsModalService,
    private orderPipe: OrderPipe
  ) {}

  ngOnInit() {
    this.loadDeals();
    this.loadOffers();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
  // Get deal list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;
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
}
