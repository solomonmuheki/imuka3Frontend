import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { DealrestApiService } from "../../sharedservice/dealrest-api.service";

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;

  // public chartEmail;
  // public chartHours;
  decDeals: number;
  novDeals: number = 0;
  octDeals: number = 0;
  sepDeals: number = 0;
  augDeals: number = 0;
  julDeals: number = 0;
  junDeals: number = 0;
  mayDeals: number = 0;
  aprilDeals: number = 0;
  marDeals: number = 0;
  febDeals: number = 0;
  janDeals: number = 0;
  year: string = "";
  fullName: string = "Hello JavaTpoint";
  Deal: any = [];
  totalDeals: number = 0;
  totalDealsThisYear: number = 0;
  constructor(public restApi: DealrestApiService) {}
  ngOnInit() {
    this.loadDeals();
    console.log("my data2:" + this.Deal);

    this.chartColor = "#FFFFFF";
  }

  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;
      this.totalDeals = this.Deal.length;
      console.log("my data:" + this.Deal);
      var currentYear = new Date().getFullYear();
      console.log("current Year: " + currentYear);
      // currentMonth = new Date().getMonth() + 1,
      var yearFilter = this.Deal.filter(e => {
        var [year, _] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
        console.log("hello3: " + year);
        return currentYear === +year;
      });
      this.totalDealsThisYear = yearFilter.length;
      yearFilter.forEach((element, index, array) => {
        console.log(element.created_at); // 100, 200, 300
        console.log(index); // 0, 1, 2
        console.log(array); // same myArray object 3 times
        var created_atMonth = new Date(element.created_at).getMonth() + 1;
        console.log("created at month:" + created_atMonth);
        if (created_atMonth == 12) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            console.log("months: " + month);
            return created_atMonth === +month;
          });
          console.log("filtered deals for DEC :" + monthFilter);
          console.log("filtered months length:" + monthFilter.length);
          this.decDeals = monthFilter.length;
        } else if (created_atMonth == 11) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            console.log("months: " + month);
            return created_atMonth === +month;
          });
          console.log("filtered deals for Nov:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.novDeals = monthFilter.length;
        } else if (created_atMonth == 10) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for oct:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.octDeals = monthFilter.length;
        } else if (created_atMonth == 9) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for sept:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.sepDeals = monthFilter.length;
        } else if (created_atMonth == 8) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for aug:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.augDeals = monthFilter.length;
        } else if (created_atMonth == 7) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for july:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.julDeals = monthFilter.length;
        } else if (created_atMonth == 6) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for june:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.junDeals = monthFilter.length;
        } else if (created_atMonth == 5) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for may:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.mayDeals = monthFilter.length;
        } else if (created_atMonth == 4) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for april:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.aprilDeals = monthFilter.length;
        } else if (created_atMonth == 3) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for mar:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.marDeals = monthFilter.length;
        } else if (created_atMonth == 2) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for Feb:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.febDeals = monthFilter.length;
        } else if (created_atMonth == 1) {
          var monthFilter = yearFilter.filter(e => {
            var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
            return created_atMonth === +month;
          });
          console.log("filtered deals for jan:" + monthFilter);
          console.log("filtered deals length:" + monthFilter.length);
          this.janDeals = monthFilter.length;
        } else {
          console.log("not valid");
        }
      });
      console.log("filtered deals for dec: " + this.decDeals);

      console.log("filtered year: " + yearFilter);

      var currentMonth = new Date().getMonth() + 1;
      console.log("current Month: " + currentMonth);
      var monthFilter = yearFilter.filter(e => {
        var [_, month] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];
        console.log("months: " + month);
        return currentMonth === +month;
      });
      console.log("filtered months:" + monthFilter);
      console.log("filtered months length:" + monthFilter.length);
      var speedCanvas = document.getElementById("speedChart");
      let date: Date = new Date();
      console.log("Year = " + date.getFullYear());
      console.log("Month = " + date.getMonth());
      console.log("dec = " + this.decDeals);
      var month;
      if (month == 0) {
      }
      // static datasets values
      //dataFirst.data[2] = 60;

      var dataFirst = {
        data: [],
        fill: false,
        borderColor: "#51CACF",
        backgroundColor: "transparent",
        pointBorderColor: "#51CACF",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };
      dataFirst.data[11] = this.decDeals;
      dataFirst.data[10] = this.novDeals;
      dataFirst.data[9] = this.octDeals;
      dataFirst.data[8] = this.sepDeals;
      dataFirst.data[7] = this.augDeals;
      dataFirst.data[6] = this.julDeals;
      dataFirst.data[5] = this.junDeals;
      dataFirst.data[4] = this.mayDeals;
      dataFirst.data[3] = this.aprilDeals;
      dataFirst.data[2] = this.marDeals;
      dataFirst.data[1] = this.febDeals;
      dataFirst.data[0] = this.janDeals;
      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: "#fbc658",
        backgroundColor: "transparent",
        pointBorderColor: "#fbc658",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var dataThird = {
        data: [0, 8, 15, 20, 12, 24, 20, 30, 22, 35, 25, 53],
        fill: false,
        borderColor: "#5cb85c",
        backgroundColor: "transparent",
        pointBorderColor: "#5cb85c",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [dataFirst, dataSecond, dataThird]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: "top"
        }
      };
      // Add Line Chart
      var lineChart = new Chart(speedCanvas, {
        type: "line",
        hover: false,
        data: speedData,
        options: chartOptions
      });
    });
  }
}
