import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";

import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

@Component({
  selector: "app-editdeal",
  templateUrl: "./editdeal.component.html",
  styleUrls: ["./editdeal.component.scss"]
})
export class EditdealComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  // const id = this.actRoute.snapshot.paramMap.get('id');
  dealData: any = {};
  submitted = false;
  registerDeal: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public editDealService: DealRegistrationApiService,

    public actRoute: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService
  ) {
    this.registerDeal = this.formBuilder.group({
      companyName: ["", Validators.required],
      companyIndustry: ["", Validators.required],
      companyType: ["", Validators.required],
      companyAddress: ["", Validators.required],
      companyTel: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.maxLength(12),
          Validators.minLength(10)
        ]
      ],

      companyEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]
      ],
      rateDeal: ["", Validators.required],
      raisedAmount: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.maxLength(12),
          Validators.minLength(4)
        ]
      ],
      DealDetailedDesc: ["", Validators.required],

      cbBp: [],
      cbMou: [],
      cbCor: [],
      cbFs: [],
      cbCashflow: [],
      cbCd: [],
      cbAuditedAccounts: []
      //image: [null],
    });
  }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    this.editDealService.getDeal(id).subscribe(data => {
      this.updateThisDealData(data);
    });
  }
  //function for setting default values from db
  updateThisDealData(data) {
    //changing values from database(1/0) to true or false respectively
    var cbBpvalue;
    var cbMouvalue;
    var cbCorvalue;
    var cbFsvalue;
    var cbCashflowvalue;
    var cbCdvalue;
    var cbAuditedAccountsvalue;
    if (data[0]["businessPlan"] == 1) {
      cbBpvalue = true;
    } else {
      cbBpvalue = false;
    }
    if (data[0]["MOU"] == 1) {
      cbMouvalue = true;
    } else {
      cbMouvalue = false;
    }
    if (data[0]["certificateOfRegistration"] == 1) {
      cbCorvalue = true;
    } else {
      cbCorvalue = false;
    }
    if (data[0]["financialStatement"] == 1) {
      cbFsvalue = true;
    } else {
      cbFsvalue = false;
    }
    if (data[0]["cashFlowStatement"] == 1) {
      cbCashflowvalue = true;
    } else {
      cbCashflowvalue = false;
    }
    if (data[0]["contractDocument"] == 1) {
      cbCdvalue = true;
    } else {
      cbCdvalue = false;
    }
    if (data[0]["auditedAccounts"] == 1) {
      cbAuditedAccountsvalue = true;
    } else {
      cbAuditedAccountsvalue = false;
    }
    //setting default values to form controls
    this.registerDeal.patchValue({
      companyName: data[0]["companyName"],
      companyIndustry: data[0]["companyIndustry"],
      companyType: data[0]["companyType"],
      companyAddress: data[0]["Address"],
      companyTel: data[0]["telephone"],
      companyEmail: data[0]["email"],
      raisedAmount: data[0]["AmountToRaise"],
      rateDeal: data[0]["rating"],
      DealDetailedDesc: data[0]["detailedDescription"],
      cbBp: cbBpvalue,
      cbMou: cbMouvalue,
      cbCor: cbCorvalue,
      cbFs: cbFsvalue,
      cbCashflow: cbCashflowvalue,
      cbCd: cbCdvalue,
      cbAuditedAccounts: cbAuditedAccountsvalue

      //image: data[0]['image'],
    });
  }

  // Choose company type using select dropdown
  changeCompanyType(e) {
    this.registerDeal.get("companyType").setValue(e.target.value, {
      onlySelf: true
    });
  }
  // Choose company Industry using select dropdown
  changeCompanyIndustry(e) {
    this.registerDeal.get("companyIndustry").setValue(e.target.value, {
      onlySelf: true
    });
  }
  // Choose RATE using select dropdown
  changerateDeal(e) {
    this.registerDeal.get("rateDeal").setValue(e.target.value, {
      onlySelf: true
    });
  }
  get f() {
    return this.registerDeal.controls;
  }

  // Accessing form control using getters
  get companyName() {
    return this.registerDeal.get("companyName");
  }

  get companyIndustry() {
    return this.registerDeal.get("companyIndustry");
  }

  get companyAddress() {
    return this.registerDeal.get("companyAddress");
  }

  get companyTel() {
    return this.registerDeal.get("companyTel");
  }
  get companyEmail() {
    return this.registerDeal.get("companyEmail");
  }

  get raisedAmount() {
    return this.registerDeal.get("raisedAmount");
  }

  get image() {
    return this.registerDeal.get("image");
  }
  get DealDetailedDesc() {
    return this.registerDeal.get("DealDetailedDesc");
  }

  get companyType() {
    return this.registerDeal.get("CompanyType");
  }
  get rateDeal() {
    return this.registerDeal.get("rateDeal");
  }
  //function called when the button is clicked to update
  onSubmit(values) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerDeal.invalid) {
      alert("failure!! :-");
      return;
    }

    //getting values from check boxes to 1 or 0
    var cbBp1: any;
    var cbMou1: any;
    var cbCor1: any;
    var cbFs1: any;
    var cbCashflow1: any;
    var cbCd1: any;
    var cbAuditedAccounts1: any;
    if (values.cbBp == true) {
      cbBp1 = 1;
    } else if (values.cbBp == false) {
      cbBp1 = 0;
    }
    if (values.cbMou == true) {
      cbMou1 = 1;
    } else if (values.cbMou == false) {
      cbMou1 = 0;
    }
    if (values.cbCor == true) {
      cbCor1 = 1;
    } else if (values.cbCor == false) {
      cbCor1 = 0;
    }
    if (values.cbFs == true) {
      cbFs1 = 1;
    } else if (values.cbFs == false) {
      cbFs1 = 0;
    }
    if (values.cbCashflow == true) {
      cbCashflow1 = 1;
    } else if (values.cbCashflow == false) {
      cbCashflow1 = 0;
    }
    if (values.cbCd == true) {
      cbCd1 = 1;
    } else if (values.cbCd == false) {
      cbCd1 = 0;
    }
    if (values.cbAuditedAccounts == true) {
      cbAuditedAccounts1 = 1;
    } else if (values.cbAuditedAccounts == false) {
      cbAuditedAccounts1 = 0;
    }
    const formData = new FormData();

    formData.append("companyName", values.companyName);
    formData.append("companyType", values.companyType);
    formData.append("companyIndustry", values.companyIndustry);
    formData.append("Address", values.companyAddress);
    formData.append("telephone", values.companyTel);
    formData.append("email", values.companyEmail);
    formData.append("rating", values.rateDeal);
    formData.append("AmountToRaise", values.raisedAmount);
    formData.append("detailedDescription", values.DealDetailedDesc);
    // formData.append("image", values.image);
    formData.append("businessPlan", cbBp1);
    formData.append("MOU", cbMou1);
    formData.append("certificateOfRegistration", cbCor1);
    formData.append("financialStatement", cbFs1);
    formData.append("cashFlowStatement", cbCashflow1);
    formData.append("contractDocument", cbCd1);
    formData.append("auditedAccounts", cbAuditedAccounts1);

    // Display the key/value pairs
    let object = {};
    formData.forEach(function(value, key) {
      object[key] = value;
    });
    let json = JSON.stringify(object);
    //console.log(json)

    if (window.confirm("Are you sure you want to update?")) {
      let id = this.actRoute.snapshot.paramMap.get("id");

      this.editDealService.updateEmployee(id, json).subscribe(
        res => {
          this.router.navigateByUrl("/alldeals");

          this.toastr.success(" Deal updated successfully!");
        },
        error => {
          this.toastr.error(error);
        }
      );
    }
  }
}
