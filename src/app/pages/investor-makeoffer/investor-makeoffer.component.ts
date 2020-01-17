import { Component, OnInit } from "@angular/core";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
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
  display = false;
  companyName: string;
  AmountToRaise: string;
  Address: string;
  dealData: any = {};
  submitted = false;
  registerOffer: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public OfferDealrestApi: OfferDealService,
    public restApi: DealRegistrationApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService
  ) {
    this.registerOffer = this.formBuilder.group({
      offer_amount: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.maxLength(10),
          Validators.minLength(3)
        ]
      ]
    });
  }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    this.restApi.getDeal(id).subscribe(data => {
      this.companyName = data[0]["companyName"];
      this.Address = data[0]["Address"];
      this.AmountToRaise = data[0]["AmountToRaise"];
    });
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
    this.display = true;
    this.submitted = true;
    let a = this.getUserId();
    this.status = 0;

    this.UserId = parseInt(a);
    // stop here if form is invalid
    if (this.registerOffer.invalid) {
      this.display = false;
      alert("Invalid!! :-");
      return;
    }

    this.OfferDealrestApi.addOffer(
      this.UserId,
      this.deal_id,
      this.registerOffer.value.offer_amount,
      this.status
    ).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            this.percentDone = false;
            this.router.navigate(["/investor-alloffers"]);
            this.toastr.success("Offer successfully created!");
            this.display = false;
        }
      },
      error => {
        this.toastr.error(
          "Offer for this deal already exists or " + error.statusText
        );
        // console.log(error);
        this.display = false;
      }
    );
  }

  getUserId() {
    return localStorage.getItem("user_id");
  }
}
