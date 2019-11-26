import { Component, OnInit } from "@angular/core";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-dealdetails",
  templateUrl: "./dealdetails.component.html",
  styleUrls: ["./dealdetails.component.css"]
})
export class DealdetailsComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  dealData: any = {};
  constructor(
    public restApi: DealrestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.restApi.getDeal(this.id).subscribe((data: {}) => {
      this.dealData = data;
    });
  }
  // Update employee data
  updateDeal() {
    if (window.confirm("Are you sure, you want to update?")) {
      this.restApi.updateDeal(this.id, this.dealData).subscribe(data => {
        this.router.navigate(["/alldeals"]);
      });
    }
  }
  //image upload
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  public message: string;

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];

    console.log("hello" + this.fileData.name);
    console.log("hello" + this.fileData.size);
    console.log("hello" + this.fileData.type);
  }
}
