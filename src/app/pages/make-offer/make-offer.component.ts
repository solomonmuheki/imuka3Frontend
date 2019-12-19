import { Component, OnInit, EventEmitter } from "@angular/core";

import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { HttpEvent, HttpEventType } from "@angular/common/http";

import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";

@Component({
  selector: "app-make-offer",
  templateUrl: "./make-offer.component.html",
  styleUrls: ["./make-offer.component.css"]
})
export class MakeOfferComponent implements OnInit {
  addNewPostForm: FormGroup;
  categories: any[] = [];
  event: EventEmitter<any> = new EventEmitter();
  registerOffer: FormGroup;
  percentDone: any = 0;
  dealId: number;
  UserId: number;
  public id;
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    public fileUploadService: DealRegistrationApiService,
    public restApi: DealrestApiService
  ) {
    this.registerOffer = this.formBuilder.group({
      offer_amount: ["", Validators.required]
    });

    // this.blogService.getCategoryList().subscribe(data => {
    //   Object.assign(this.categories, data);
    // }, error => { console.log('Error while gettig category data.'); });
  }

  addNewOffer(id: number) {
    this.dealId = id;
    console.log("Request has been made!" + id);
    // var a = this.getUserId();

    // this.UserId = parseInt(a);

    // this.fileUploadService
    //   .addOffer(this.UserId, this.dealId, this.registerOffer.value.offer_amount)
    //   .subscribe((event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         console.log("Request has been made!");
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         console.log("Response header has been received!");
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.percentDone = Math.round((event.loaded / event.total) * 100);
    //         console.log(`Uploaded! ${this.percentDone}%`);
    //         break;
    //       case HttpEventType.Response:
    //         console.log("Offer successfully created!", event.body);
    //         this.percentDone = false;
    //     }
    //   });
  }
  onPostFormSubmit() {
    // let postData = {
    //   'Title': this.addNewPostForm.get('title').value,
    //   'Description': this.addNewPostForm.get('description').value,
    //   'CategoryId': this.addNewPostForm.get('category').value,
    // };
    // this.blogService.addPost(postData).subscribe(data=>{
    //   console.log(data);
    //   if(data!=null && data>0){
    //     this.event.emit('OK');
    //     this.bsModalRef.hide();
    //   }
    // });
  }

  onClose() {
    this.bsModalRef.hide();
  }
  // Get deal list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      // this.Deal = data;
    });
  }
  ngOnInit() {
    console.log("my:" + this.id);
  }

  submitOfferData() {
    this.fileUploadService
      .addOffer(
        this.registerOffer.value.offer_amount,
        this.registerOffer.value.offer_amount,
        this.registerOffer.value.offer_amount
      )
      .subscribe((event: HttpEvent<any>) => {
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
