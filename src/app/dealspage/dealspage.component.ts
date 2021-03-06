import { Component, OnInit } from "@angular/core";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { DealRegistrationApiService } from "../sharedservice/deal-registration-api.service";

@Component({
  selector: "app-dealspage",
  templateUrl: "./dealspage.component.html",
  styleUrls: ["./dealspage.component.scss"]
})
export class DealspageComponent implements OnInit {
  currentRate = 8;
  Deal: any = [];
  Deal2: any = [];
  Deal3: any = [];
  searched_deals: any = [];
  startDate: any;
  noDays: any;
  currentDate = new Date().getTime(); // current date
  display = true;
  selectedLocation: string = "";
  selectedIndustry: string = "";
  empty: string = "There is no recent Deal added yet!";
  // Pagination parameters.
  p: number = 1;
  count: number = 6;
  constructor(
    public restApi: DealRegistrationApiService,
    config: NgbRatingConfig,
    private SpinnerService: NgxSpinnerService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.loadDeals();
  }
  // Get deals list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;

      this.startDate = this.Deal.created_at;
      let createdDealDate: Date = new Date(this.startDate);

      // get dates 30 days ago
      let currentDate = new Date();
      let dt2 = currentDate.setDate(currentDate.getDate() - 30);

      //deals created within 30 days from now
      let result = this.Deal.filter(function(item) {
        let itemTime = new Date(item.created_at).getTime();
        let dealStatus = item.status;
        return itemTime >= dt2 && dealStatus == 0;
      });
      this.Deal2 = result;
      //Sorting an array of deals with the newest first
      this.Deal2 = result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      this.Deal3 = this.Deal2;
      this.searched_deals = this.Deal2;
      this.display = false;
    });
  }

  backDays(dealIndex) {
    let updatedDealDate: Date = new Date(dealIndex); //date deal was updated
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let dateAfter_Days = updatedDealDate.setDate(
      updatedDealDate.getDate() + 30
    ); //date after 30days

    let firstDate = new Date().getTime(); // current date
    this.noDays = Math.round(Math.abs((dateAfter_Days - firstDate) / oneDay));

    return this.noDays;
  }
  //function called when searching for deals
  search() {
    let searchedDeals;

    if (this.selectedIndustry == "" && this.selectedLocation == "") {
      searchedDeals = this.searched_deals;
    } else if (this.selectedLocation == "") {
      searchedDeals = this.Deal2.filter(deals => {
        return deals.companyIndustry === this.selectedIndustry;
      });
    } else if (this.selectedIndustry === "") {
      searchedDeals = this.Deal2.filter(deals => {
        return deals.Address === this.selectedLocation;
      });
    } else {
      searchedDeals = this.Deal2.filter(deals => {
        return (
          deals.companyIndustry === this.selectedIndustry &&
          deals.Address === this.selectedLocation
        );
      });
    }

    this.Deal3 = searchedDeals;
    if (this.Deal3.length == 0) {
      this.empty = "no matching results";
    }
  }
}
