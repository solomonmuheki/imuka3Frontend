import { Component, OnInit } from "@angular/core";
import { DealrestApiService } from "../../../sharedservice/dealrest-api.service";
@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.scss"]
})
export class BodyComponent implements OnInit {
  Deal: any = [];
  Deal2: any = [];
  Deal3: any = [];
  startDate: any;
  noDays: any;
  currentDate = new Date().getTime(); // current date

  constructor(public restApi: DealrestApiService) {}

  ngOnInit() {
    this.loadDeals();
  }
  // Get deals list
  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;
      console.log(this.Deal);
      console.log("mine:"+this.Deal[4]. 
        created_at );
      console.log(this.Deal.length);
      this.startDate = this.Deal. 
      created_at ;
      let createdDealDate: Date = new Date(this.startDate);

      console.log("start" + new Date("2019-10-2").getTime());
      let currentDate = new Date();
      var dt2 = currentDate.setDate(currentDate.getDate() - 1);
      console.log("date before current date: " + new Date(dt2));
      // var young = this.Deal.filter(function(valid) {
      //   return valid.Time < dt2;
      // });

      var result = this.Deal.filter(function(item) {
        var itemTime = new Date(item. 
          created_at).getTime();
        return itemTime >= dt2;
      });
      this.Deal2 = result;
      //Sorting an array of deals with the newest first
      this.Deal2 = result.sort(
        (a, b) =>
          new Date(b. 
            created_at ).getTime() - new Date(a. 
              created_at ).getTime()
      );
      //get the first 6 elements
      this.Deal3 = this.Deal2.slice(0, 6);
      //loop through all deals
      for (let item of this.Deal3) {
        var a: Date = new Date(item. 
          created_at );

        var dt3 = a.setDate(a.getDate() - 30);
        // var dt2 = currentDate.setDate(currentDate.getDate() - 1);
        console.log("30 days before " + dt3); // Will display contents of the object inside the array
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

        //var secondDate = new Date().getTime(); // 2nd date
        //var Days = Math.floor((secondDate - firstDate) / (1000 * 60 * 60 * 24));
        var x = new Date(this.Deal3. 
          created_at ).getTime();
        var y = new Date(item. 
          created_at ).getTime();
        var i = 0;
        while (this.Deal3[i]) {
          var firstDate = new Date().getTime(); // current date
          var noDays2 = Math.round(Math.abs((firstDate - dt3) / oneDay));
          console.log("days Left in loop : " + this.noDays + " left");
          i++;
        }
        //var firstDate = new Date(item.createdDate).getTime(); // current date
        //this.noDays = Math.round(Math.abs((firstDate - dt3) / oneDay));
      }
      console.log("days Left : " + this.noDays + " left");

      console.log("returned objects: " + this.Deal3);
    });
  }

  calculateDif(deal) {
    //let diff = Math.abs(event.date1 - event.date2);
    var a: Date = new Date(this.Deal3.createdDate[1]);
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var dt3 = a.setDate(a.getDate() - 30);
    var firstDate = new Date().getTime(); // current date
    this.noDays = Math.round(Math.abs((firstDate - dt3) / oneDay));
    console.log("days Left in loop : " + this.noDays + " left");
    return this.noDays;
  }
  backDays(dealIndex) {
    //let diff = Math.abs(event.date1 - event.date2);
    var a: Date = new Date(dealIndex);
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var dt3 = a.setDate(a.getDate() - 30);
    var firstDate = new Date().getTime(); // current date
    this.noDays = Math.round(Math.abs((firstDate - dt3) / oneDay));
    console.log("days Left in loop : " + this.noDays + " left");
    return this.noDays;
  }
  // Delete deal
  deleteDeals(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.restApi.deleteDeal(id).subscribe(data => {
        this.loadDeals();
      });
    }
  }
}
