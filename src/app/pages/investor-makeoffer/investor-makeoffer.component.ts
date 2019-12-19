import { Component, OnInit } from "@angular/core";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { OfferDealService } from "../../sharedservice/offer-deal.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

@Component({
  selector: "app-investor-makeoffer",
  templateUrl: "./investor-makeoffer.component.html",
  styleUrls: ["./investor-makeoffer.component.css"]
})
export class InvestorMakeofferComponent implements OnInit {
  deal_id = this.actRoute.snapshot.params["id"];
  percentDone: any = 0;
  UserId: any;
  status: any;
  // const id = this.actRoute.snapshot.paramMap.get('id');
  dealData: any = {};
  submitted = false;
  registerOffer: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public OfferDealrestApi: OfferDealService,
    public restApi: DealrestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService
  ) {
    this.registerOffer = this.formBuilder.group({
      offer_amount: ["", Validators.required]
    });
  }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    this.restApi.getDeal(id).subscribe(data => {});
  }

  get f() {
    return this.registerOffer.controls;
  }

  // Accessing form control using getters
  get offer_amount() {
    return this.registerOffer.get("offer_amount");
  }

  //function called when the button is clicked to update
  addNewOffer() {
    this.submitted = true;
    let a = this.getUserId();
    this.status = 0;

    this.UserId = parseInt(a);
    // stop here if form is invalid
    if (this.registerOffer.invalid) {
      alert("failure!! :-");
      return;
    }

    this.OfferDealrestApi.addOffer(
      this.UserId,
      this.deal_id,
      this.registerOffer.value.offer_amount,
      this.status
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log("Request has been made!");
          break;
        case HttpEventType.ResponseHeader:
          console.log("Response header has been received!");
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round((event.loaded / event.total) * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log("Offer successfully created!", event.body);
          this.percentDone = false;
      }
    });
  }
  getUserId() {
    return localStorage.getItem("user_id");
  }
}
