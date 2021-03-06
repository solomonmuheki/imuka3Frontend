import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

@Component({
  selector: "app-adddeal",
  templateUrl: "./adddeal.component.html",
  styleUrls: ["./adddeal.component.css"]
})
export class AdddealComponent implements OnInit {
  user_id: any;
  status: any;
  dealStatus: number = 0;
  registerDeal: FormGroup;
  submitted = false;
  display = false;
  preview: string;
  percentDone: any = 0;
  users = [];

  constructor(
    private formBuilder: FormBuilder,
    public DealRegistrationApi: DealRegistrationApiService,
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
      image: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.user_id = this.getUserId();
    this.status = this.getUserStatus();
  }
  //get the user id from local Storage
  getUserId() {
    return localStorage.getItem("user_id");
  }
  getUserStatus() {
    return localStorage.getItem("status");
  }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registerDeal.patchValue({
      image: file
    });
    //console.log(file);
    this.registerDeal.get("image").updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  //change event called on checkboxes
  isChecked: any;
  cbBp: number = 0;
  cbMou: number = 0;
  cbCor: number = 0;
  cbFs: number = 0;
  cbCashflow: number = 0;
  cbCd: number = 0;
  cbAuditedAccounts: number = 0;

  changed = evt => {
    this.isChecked = evt.target.checked;

    if (this.isChecked == true) {
      this.cbBp = 1;
    } else {
      this.cbBp = 0;
    }
  };
  changedCb2 = evt => {
    this.isChecked = evt.target.checked;

    if (this.isChecked == true) {
      this.cbMou = 1;
    } else {
      this.cbMou = 0;
    }
  };
  changedCb3 = evt => {
    this.isChecked = evt.target.checked;

    if (this.isChecked == true) {
      this.cbCor = 1;
    } else {
      this.cbCor = 0;
    }
  };
  changedCb4 = evt => {
    this.isChecked = evt.target.checked;

    if (this.isChecked == true) {
      this.cbFs = 1;
    } else {
      this.cbFs = 0;
    }
  };
  changedCb5 = evt => {
    this.isChecked = evt.target.checked;

    if (this.isChecked == true) {
      this.cbCashflow = 1;
    } else {
      this.cbCashflow = 0;
    }
  };
  changedCb6 = evt => {
    this.isChecked = evt.target.checked;

    if (this.isChecked == true) {
      this.cbCd = 1;
    } else {
      this.cbCd = 0;
    }
  };
  changedCb7 = evt => {
    this.isChecked = evt.target.checked;

    if (this.isChecked == true) {
      this.cbAuditedAccounts = 1;
    } else {
      this.cbAuditedAccounts = 0;
    }
  };

  //method to save data to database
  submitDealData() {
    this.DealRegistrationApi.addDeal(
      this.user_id,
      this.registerDeal.value.companyName,
      this.registerDeal.value.companyType,
      this.registerDeal.value.companyIndustry,
      this.registerDeal.value.companyAddress,
      this.registerDeal.value.companyTel,
      this.registerDeal.value.companyEmail,
      this.registerDeal.value.rateDeal,
      this.dealStatus,
      this.registerDeal.value.raisedAmount,
      this.registerDeal.value.DealDetailedDesc,
      this.registerDeal.value.image,
      this.cbBp,
      this.cbMou,
      this.cbCor,
      this.cbFs,
      this.cbCashflow,
      this.cbCd,
      this.cbAuditedAccounts
    ).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            // console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            //console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            this.percentDone = Math.round((event.loaded / event.total) * 100);
            // console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            this.percentDone = false;
            this.router.navigate(["/alldeals"]);
            this.toastr.success("Deal successfully created!");
            this.display = false;
        }
      },
      error => {
        // console.log(error);
        this.toastr.error(error.message);
        this.display = false;
      }
    );
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
  //convenience getter for easy access to form fields
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
  get rateDeal() {
    return this.registerDeal.get("rateDeal");
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
  //function called on button click tosave deal in the database
  onSubmit() {
    this.submitted = true;
    this.display = true;
    // stop here if form is invalid
    if (this.registerDeal.invalid) {
      alert("Please Velify that Data Entered is Valid!! :-");
      this.display = false;
      return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerDeal.value))
    this.submitDealData();
  }
}
