import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { OfferDealService } from "../../sharedservice/offer-deal.service";

@Component({
  selector: "app-dealdetails",
  templateUrl: "./dealdetails.component.html",
  styleUrls: ["./dealdetails.component.css"]
})
export class DealdetailsComponent implements OnInit {
  deal_id = this.actRoute.snapshot.params["id"];
  Offer: any = [];
  display = true;
  dealData: any = {};
  companyName: string;
  companyType: string;
  companyIndustry: string;
  image: string;
  telephone: string;
  email: string;
  AmountToRaise: string;
  Address: string;
  created_at: string;
  rating: number;
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
    public restApi: DealRegistrationApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public offerRestApi: OfferDealService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    this.restApi.getDeal(id).subscribe(data => {
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
      this.rating = data[0]["rating"];
      this.detailedDescription = data[0]["detailedDescription"];
      this.updated_at = data[0]["updated_at"];
      this.businessPlan = data[0]["businessPlan"];
      this.MOU = data[0]["MOU"];
      this.auditedAccounts = data[0]["auditedAccounts"];
      this.cashFlowStatement = data[0]["cashFlowStatement"];
      this.certificateOfRegistration = data[0]["certificateOfRegistration"];
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
      this.display = false;
    });
    this.loadOffers();
  }
  // Get offer list
  loadOffers() {
    return this.offerRestApi.getDealOffers(this.deal_id).subscribe(
      (data: {}) => {
        this.Offer = data;
      },
      error => {
        console.log(error.message);
      }
    );
  }
}
