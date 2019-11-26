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
  Deal: any = [];
  constructor(public restApi: DealrestApiService) {}
  ngOnInit() {
    this.loadDeals();
    this.chartColor = "#FFFFFF";
    var speedCanvas = document.getElementById("speedChart");
    let date: Date = new Date();
    console.log("Year = " + date.getFullYear());
    console.log("Month = " + date.getMonth());
    var month;
    if (month == 0) {
    }
    // static datasets values
    //dataFirst.data[2] = 60;

    var dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: "#fbc658",
      backgroundColor: "transparent",
      pointBorderColor: "#fbc658",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };
    dataFirst.data[0] = 60;
    dataFirst.data[3] = 50;
    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: "#51CACF",
      backgroundColor: "transparent",
      pointBorderColor: "#51CACF",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var dataThird = {
      data: [0, 8, 15, 20, 12, 24, 80, 30, 22, 35, 25, 53],
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

    console.log("From array" + dataFirst.data[3]);
  }

  loadDeals() {
    return this.restApi.getDeals().subscribe((data: {}) => {
      this.Deal = data;

      var array = [
          {
            title: "a",
            date: "2018-03-29"
          },
          {
            title: "b",
            date: "2018-04-13"
          },
          {
            title: "c",
            date: "2018-04-12"
          },
          {
            title: "leave",
            date: "2018-04-11"
          },
          {
            title: "d",
            date: "2019-11-16"
          },
          {
            title: "d",
            date: "2019-11-10"
          }
        ],
        currentYear = new Date().getFullYear();

      // currentMonth = new Date().getMonth() + 1,
      var events = array.filter(e => {
        var [year, _] = e.date.split("-"); // Or, var month = e.date.split('-')[1];
        return currentYear === 2019;
      });
      console.log("hello3: " + events);
    });
  }
}
