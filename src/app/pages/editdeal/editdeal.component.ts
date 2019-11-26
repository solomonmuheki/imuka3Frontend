import { Component, OnInit } from "@angular/core";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from "../../sharedservice/file-upload.service";
import { Deal } from 'src/app/sharedservice/deal';


@Component({
  selector: "app-editdeal",
  templateUrl: "./editdeal.component.html",
  styleUrls: ["./editdeal.component.scss"]
})
export class EditdealComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  dealData: any = {};
  submitted = false;
  registerDeal: FormGroup;
  percentDone: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    public fileUploadService: FileUploadService,
    public restApi: DealrestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    // this.restApi.getDeal(this.id).subscribe((data: {}) => {
    //   this.dealData = data;
    // });
    this.updateDealData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.restApi.getDeal(id).subscribe(data =>
      
      {
      this.dealData = data;
      console.log("hello:"+data)
      console.log("hello2:"+data)
      console.log("hello:"+JSON.stringify(data))
      console.log("hello:"+this.dealData.companyName)
      //this.registerDeal.setValue(this.dealData) 
      this.registerDeal.patchValue({
        companyName:data.companyName,
        companyIndustry:data.companyIndustry,
      companyType:data.companyType,
      companyAddress:this.dealData.companyAddress,
      companyTel: data.companyName,
      companyEmail:data.companyName,
      raisedAmount:data.companyName,
      DealDetailedDesc:data.companyName,
      image: data.companyName,
      }) // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }
  // Contains Reactive Form logic
  updateDealData() {
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
  // Update employee data
  updateEmployee() {
    if (window.confirm("Are you sure, you want to update?")) {
      this.restApi.updateDeal(this.id, this.dealData).subscribe(data => {
        this.router.navigate(["/alldeals"]);
      });
    }
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
    console.log("image"+this.registerDeal.value.image+" hello"+this.registerDeal.value.companyAddress+" "+this.registerDeal.value.cbBp)
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
