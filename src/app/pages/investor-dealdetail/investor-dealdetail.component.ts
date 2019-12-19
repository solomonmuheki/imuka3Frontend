import { Component, OnInit, EventEmitter } from "@angular/core";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
import { OfferDealService } from "../../sharedservice/offer-deal.service";

import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-investor-dealdetail",
  templateUrl: "./investor-dealdetail.component.html",
  styleUrls: ["./investor-dealdetail.component.css"]
})
export class InvestorDealdetailComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  offerId: number;
  offerData: any;
  dealData: any;
  event: EventEmitter<any> = new EventEmitter();
  //dealData: any = {};
  companyName: string;
  companyType: string;
  companyIndustry: string;
  image: string;
  telephone: string;
  email: string;
  AmountToRaise: string;
  Address: string;
  created_at: string;
  detailedDescription: string;
  updated_at: string;
  businessPlan: number;
  MOU: number;
  auditedAccounts: number;
  cashFlowStatement: number;
  certificateOfRegistration: number;
  contractDocument: number;
  financialStatement: number;
  documents = [];
  constructor(
    public restApi: DealrestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private offerService: OfferDealService,
    private dealRestApiService: DealRegistrationApiService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.offerService.offerIdData.subscribe(data => {
      this.offerId = data;
      console.log("data:" + this.offerId);
      if (this.offerId !== undefined) {
        this.offerService.getOffer(this.offerId).subscribe(data => {
          this.offerData = data;

          if (this.offerData != null) {
            let dealId = this.offerData[0]["deal_id"];

            //get deal data
            this.dealRestApiService.getDeal(dealId).subscribe(data => {
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
              this.detailedDescription = data[0]["detailedDescription"];
              this.updated_at = data[0]["updated_at"];
              this.businessPlan = data[0]["businessPlan"];
              this.MOU = data[0]["MOU"];
              this.auditedAccounts = data[0]["auditedAccounts"];
              this.cashFlowStatement = data[0]["cashFlowStatement"];
              this.certificateOfRegistration =
                data[0]["certificateOfRegistration"];
              this.contractDocument = data[0]["contractDocument"];
              this.financialStatement = data[0]["financialStatement"];

              if (this.businessPlan == 1) {
                this.documents.push("Business Plan");
              }
              if (this.MOU == 1) {
                this.documents.push("Memorandum of Understanding");
              }
              if (this.auditedAccounts == 1) {
                this.documents.push("Audited Accounts");
              }
              if (this.cashFlowStatement == 1) {
                this.documents.push("Cash Flow Statement");
              }
              if (this.certificateOfRegistration == 1) {
                this.documents.push("Certificate Of Registration");
              }
              if (this.contractDocument == 1) {
                this.documents.push("Contract Document");
              }
              if (this.financialStatement == 1) {
                this.documents.push("Financial Statement");
              }
            });
          }
        });
      }
    });
  }
  onClose() {
    this.bsModalRef.hide();
  }
}
