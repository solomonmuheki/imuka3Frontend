import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from "../../sharedservice/file-upload.service";


@Component({
  selector: "app-adddeal",
  templateUrl: "./adddeal.component.html",
  styleUrls: ["./adddeal.component.css"]
})
export class AdddealComponent implements OnInit {
  registerDeal: FormGroup;
  submitted = false;

 

  preview: string;
  //form: FormGroup;
  percentDone: any = 0;
  users = [];

  CompanyType: any = [
    "Public company",
    "Self-employed",
    "Government agency",
    "Nonprofit",
    "Sole proprietorship",
    "Privately held",
    "Partnership"
  ];
  CompanyIndustry: any = [
    "Clean Energy/Recycling/Upcycling and Environmental Conservation",
    "Technology/ ICT and IT-Enabled Service",
    "Tourism and Hospitality",
    "Healthcare and Pharmaceuticals",
    "Education",
    "Manufacturing",
    "Trade(Retail and Wholesale)",
    "Transport and Logistics"
  ];
  constructor(
   
    private formBuilder: FormBuilder,
    public fileUploadService: FileUploadService,
    public restApi: DealrestApiService,
    public router: Router
  ) {
    this.registerDeal = this.formBuilder.group({
      companyName: ["", Validators.required],
      companyIndustry: ["", Validators.required],
      companyType: ["", Validators.required],
      companyAddress: ["", Validators.required],
      companyTel: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      companyEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]
      ],
      raisedAmount: ["", Validators.required],
      DealDetailedDesc: ["", Validators.required],
      image: [null,Validators.required],
      
     
    });
  }

  ngOnInit() {
   
  }
  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registerDeal.patchValue({
      image: file
     
    });
    console.log(file)
    this.registerDeal.get('image').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  isChecked:any
  cbBp:number=0;
  cbMou:number=0;
  cbCor:number=0;
  cbFs:number=0;
  cbCashflow:number=0;
  cbCd:number=0;
  cbAuditedAccounts:number=0;
  
  changed = (evt) => {    
    this.isChecked = evt.target.checked;
   
    if(this.isChecked==true){
    this.cbBp=1
    }else{this.cbBp=0}
    console.log("Business Plan"+this.cbBp)
  }
  changedCb2 = (evt) => {    
    this.isChecked = evt.target.checked;
   
    if(this.isChecked==true){
    this.cbMou=1
    }else{this.cbMou=0}
    console.log("mou"+this.cbMou)
  }
  changedCb3 = (evt) => {    
    this.isChecked = evt.target.checked;
   
    if(this.isChecked==true){
    this.cbCor=1
    }else{this.cbCor=0}
    console.log("Certificate of Registration"+this.cbCor)
  }
  changedCb4 = (evt) => {    
    this.isChecked = evt.target.checked;
   
    if(this.isChecked==true){
    this.cbFs=1
    }else{this.cbFs=0}
    console.log("Financial Statement"+this.cbFs)
  }
  changedCb5 = (evt) => {    
    this.isChecked = evt.target.checked;
   
    if(this.isChecked==true){
    this.cbCashflow=1
    }else{this.cbCashflow=0}
    console.log("Cash flow Statement"+this.cbCashflow)
  }
  changedCb6 = (evt) => {    
    this.isChecked = evt.target.checked;
   
    if(this.isChecked==true){
    this.cbCd=1
    }else{this.cbCd=0}
    console.log("Contract Document"+this.cbCd)
  }
  changedCb7 = (evt) => {    
    this.isChecked = evt.target.checked;
   
    if(this.isChecked==true){
    this.cbAuditedAccounts=1
    }else{this.cbAuditedAccounts=0}
    console.log(" Audited Accounts"+this.cbAuditedAccounts)
  }
  submitDealData() {
    console.log("image:"+this.registerDeal.value.image+" hello:"+this.registerDeal.value.companyAddress+" "+this.registerDeal.value.cbBp)
    this.fileUploadService.addUser(
      this.registerDeal.value.companyName,
      this.registerDeal.value.companyType,
      this.registerDeal.value.companyIndustry,
      this.registerDeal.value.companyAddress,
      this.registerDeal.value.companyTel,
      this.registerDeal.value.companyEmail,
      this.registerDeal.value.raisedAmount,
      this.registerDeal.value.DealDetailedDesc,
      this.registerDeal.value.image,
    this.cbBp,
    this.cbMou,
    this.cbCor,
    this.cbFs,
    this. cbCashflow,
    this.cbCd,
    this.cbAuditedAccounts
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Deal successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['/alldeals'])
      }
    })
  }
  // Choose city using select dropdown
  // changeCompanyType(e) {
  //   this.registerDeal.get("CompanyType_name").setValue(e.target.value, {
  //     onlySelf: true
  //   });
  // }
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
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerDeal.invalid) {
      alert('failure!! :-')
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerDeal.value))
    this.submitDealData();
}
}
