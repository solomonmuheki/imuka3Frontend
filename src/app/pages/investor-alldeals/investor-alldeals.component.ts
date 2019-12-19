import { Component, OnInit } from "@angular/core";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { OfferDealService } from "../../sharedservice/offer-deal.service";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { MakeOfferComponent } from "../make-offer/make-offer.component";

@Component({
  selector: "app-investor-alldeals",
  templateUrl: "./investor-alldeals.component.html",
  styleUrls: ["./investor-alldeals.component.css"]
})
export class InvestorAlldealsComponent implements OnInit {
  Deal: any = [];
  Offer: any = [];

  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;
  bsModalRef: BsModalRef;
  settings = {
    columns: {
      companyName: {
        title: "Company Name"
      },
      companyType: {
        title: "Company Type"
      },
      companyIndustry: {
        title: "Company Industry"
      },
      Address: {
        title: "Address"
      },
      telephone: {
        title: "telephone"
      },
      AmountToRaise: {
        title: "Amount To Raise"
      }
    },
    actions: {
      columnTitle: "Action",
      add: false,
      edit: false,
      delete: false,
      position: "left",
      custom: [
        {
          name: "yourAction",
          title: '<i class="ion-document" title="YourAction"></i>'
        },
        {
          name: "editAction",
          title: '<i class="fa fa-edit" title="Edit"></i>'
        },
        {
          name: "deleteAction",
          title: '<i class="far fa-trash-alt" title="delete"></i>'
        }
      ]
    },
    attr: {
      class: "table table-striped table-bordered "
    },
    defaultStyle: false
  };
  //sorting
  key: string = "name"; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(
    public restApi: DealrestApiService,
    public offerRestApi: OfferDealService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadDeals();
    this.loadOffers();
  }

  // Get deal list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;
    });
  }
  // Get deal list
  loadOffers() {
    return this.offerRestApi.getOffers().subscribe((data: {}) => {
      this.Offer = data;
      console.log("data" + this.Offer);
    });
  }

  // Delete deal
  deleteDeal(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.restApi.deleteDeal(id).subscribe(data => {
        this.loadDeals();
      });
    }
  }
  addNewOffer(id: number) {
    this.bsModalRef = this.bsModalService.show(MakeOfferComponent);
    this.bsModalRef.content.id = id;
    console.log("deal id:", id);
    this.bsModalRef.content.event.subscribe(result => {
      console.log("result:" + result);
      if (result == "OK") {
        this.loadDeals();
      }
    });
  }

  // deletePost(postId: number, title: string) {
  //   this.bsModalRef = this.bsModalService.show(DeletePostComponent);
  //   this.bsModalRef.content.postId = postId;
  //   this.bsModalRef.content.title = title;
  //   this.bsModalRef.content.event.subscribe(result => {
  //     console.log("deleted", result);
  //     if (result == "OK") {
  //       setTimeout(() => {
  //         this.postList = [];
  //         this.getPosts();
  //       }, 5000);
  //     }
  //   });
  // }

  // editPost(postId: number) {
  //   this.blogService.changePostId(postId);

  //   this.bsModalRef = this.bsModalService.show(EditPostComponent);
  //   this.bsModalRef.content.event.subscribe(result => {
  //     if (result == "OK") {
  //       setTimeout(() => {
  //         this.getPosts();
  //       }, 5000);
  //     }
  //   });
  // }
}
