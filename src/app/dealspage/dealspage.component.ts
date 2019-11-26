import { Component, OnInit } from "@angular/core";

import { DealrestApiService } from "../sharedservice/dealrest-api.service";

@Component({
  selector: "app-dealspage",
  templateUrl: "./dealspage.component.html",
  styleUrls: ["./dealspage.component.scss"]
})
export class DealspageComponent implements OnInit {
  Deal: any = [];

  Deal2: any = [];
  Deal3: any = [];
  startDate: any;
  noDays: any;
  currentDate = new Date().getTime(); // current date
  // Pagination parameters.
  p: Number = 1;
  count: Number = 9;

  constructor(public restApi: DealrestApiService) {}

  ngOnInit() {
    this.loadDeals();
  }

  // Get deals list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;
      //fetching deal created date
      this.startDate = this.Deal.createdDate;
      let createdDealDate: Date = new Date(this.startDate);
      //get the current date and transform it to time
      let currentDate = new Date();
      var dt2 = currentDate.setDate(currentDate.getDate() - 1);
      console.log("date before current date: " + new Date(dt2));
      //filter records to return only deals registered 30days ago
      var result = this.Deal.filter(function(item) {
        var itemTime = new Date(item.createdDate).getTime();
        return itemTime >= dt2;
      });
      this.Deal2 = result;
      //Sorting an array of deals with the newest first
      this.Deal2 = result.sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      //get the first 6 elements
      this.Deal3 = this.Deal2.slice(0, 6);
    });
  }
  //function to calculate the number of days left for every deal
  backDays(dealIndex) {
    var a: Date = new Date(dealIndex); //deal created date
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var dt3 = a.setDate(a.getDate() - 30);
    var firstDate = new Date().getTime(); // current date
    this.noDays = Math.round(Math.abs((firstDate - dt3) / oneDay));
    console.log("days Left in loop : " + this.noDays + " left");
    return this.noDays;
  }
}
