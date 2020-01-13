import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { OfferDealService } from "../../sharedservice/offer-deal.service";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-investor-update-offer",
  templateUrl: "./investor-update-offer.component.html",
  styleUrls: ["./investor-update-offer.component.css"]
})
export class InvestorUpdateOfferComponent implements OnInit {
  Offer: any = [];
  updateOfferForm: FormGroup;
  categories: any[] = [];
  offerId: number;
  offerData: any;
  dealData: any;
  companyName: string;
  AmountToRaise: string;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private builder: FormBuilder,
    private offerService: OfferDealService,
    private dealRestApiService: DealRegistrationApiService,
    private bsModalRef: BsModalRef
  ) {
    this.updateOfferForm = this.builder.group({
      offerAmount: new FormControl("", [])
    });
    //get offer id to be used in a model
    this.offerService.offerIdData.subscribe(data => {
      this.offerId = data;
      console.log("data:" + this.offerId);

      if (this.offerId !== undefined) {
        this.offerService.getOffer(this.offerId).subscribe(
          data => {
            this.offerData = data;

            if (this.updateOfferForm != null && this.offerData != null) {
              this.updateOfferForm.controls["offerAmount"].setValue(
                this.offerData[0]["offer_amount"]
              );
              let dealId = this.offerData[0]["deal_id"];

              //get deal data
              this.dealRestApiService.getDeal(dealId).subscribe(data => {
                this.companyName = data[0]["companyName"];

                this.AmountToRaise = data[0]["AmountToRaise"];
              });
            }
          },
          error => {
            console.log(error);
            console.log("Error while gettig post details");
          }
        );
      }
    });
  }

  onupdateOfferFormSubmit() {
    let offerId = this.offerId;
    console.log(offerId);
    let offerData = {
      offer_amount: this.updateOfferForm.get("offerAmount").value
    };

    this.offerService.updateOffer(offerId, offerData).subscribe(data => {
      this.event.emit("OK");
      this.bsModalRef.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit() {
    this.loadOffers();
  }
  // Get offer list

  loadOffers() {
    return this.offerService.getOffers().subscribe((data: {}) => {
      this.Offer = data;
    });
  }
}
