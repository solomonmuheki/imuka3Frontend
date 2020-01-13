import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { OfferDealService } from "../../sharedservice/offer-deal.service";
import { DealRegistrationApiService } from "../../sharedservice/deal-registration-api.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  user_id = this.getUserId();
  error: null;
  public canvas: any;
  public ctx;
  public chartColor;

  decDeals: number = 0;
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

  Deal: any = [];
  totalDeals: number = 0;
  totalDealsThisYear: number = 0;

  decOffers: number = 0;
  novOffers: number = 0;
  octOffers: number = 0;
  sepOffers: number = 0;
  augOffers: number = 0;
  julOffers: number = 0;
  junOffers: number = 0;
  mayOffers: number = 0;
  aprilOffers: number = 0;
  marOffers: number = 0;
  febOffers: number = 0;
  janOffers: number = 0;
  Offer: any = [];
  totalOffers: number = 0;
  totalOffersThisYear: number = 0;

  yearlyOffers = [];
  yearlyDeals = [];
  display = true;

  year: number = new Date().getFullYear();

  angularForm = new FormGroup({
    date: new FormControl()
  });
  constructor(
    public restApi: DealRegistrationApiService,
    public offerRestApi: OfferDealService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angularForm = this.fb.group({
      date: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.loadDeals();
    this.loadOffers();
  }
  //getting user id
  getUserId() {
    return localStorage.getItem("user_id");
  }
  graph() {
    let speedCanvas = document.getElementById("speedChart");

    let offerData = {
      data: this.yearlyOffers,
      fill: false,
      borderColor: "#fbc658",
      backgroundColor: "transparent",
      pointBorderColor: "#fbc658",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };
    let dealData = {
      data: this.yearlyDeals,
      fill: false,
      borderColor: "#51CACF",
      backgroundColor: "transparent",
      pointBorderColor: "#51CACF",
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
      datasets: [offerData, dealData]
    };

    let chartOptions = {
      legend: {
        display: false,
        position: "top"
      }
    };
    // Add Line Chart
    let lineChart = new Chart(speedCanvas, {
      type: "line",
      hover: false,
      data: speedData,
      options: chartOptions
    });

    this.chartColor = "#FFFFFF";
    this.display = false;
  }

  loadDeals() {
    return this.restApi.getUserDeals(this.user_id).subscribe(
      data => this.handleDealResponse(data),
      error => this.handleDealError(error)
    );
  }
  handleDealResponse(data) {
    this.Deal = data;
    //getting the total number of deals
    this.totalDeals = this.Deal.length;
    //get current year
    let currentYear = new Date().getFullYear();

    //filter to get all deals in particular year
    let yearFilter = this.Deal.filter(e => {
      let [year, _] = e.created_at.split("-");

      return currentYear === +year;
    });
    //get total deals in a current year
    this.totalDealsThisYear = yearFilter.length;
    //loop through objects to get offers in a particular month in a year
    yearFilter.forEach((element, index, array) => {
      let created_atMonth = new Date(element.created_at).getMonth() + 1;
      //get total deals in dec
      if (created_atMonth == 12) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");

          return created_atMonth === +month;
        });

        this.decDeals = monthFilter.length;
      }
      //get total deals in nov
      else if (created_atMonth == 11) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");

          return created_atMonth === +month;
        });

        this.novDeals = monthFilter.length;
      }
      //get total deals in oct
      else if (created_atMonth == 10) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.octDeals = monthFilter.length;
      }
      //get total deals in sept
      else if (created_atMonth == 9) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.sepDeals = monthFilter.length;
      }
      //get total deals in aug
      else if (created_atMonth == 8) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.augDeals = monthFilter.length;
      }
      //get total deals in jul
      else if (created_atMonth == 7) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.julDeals = monthFilter.length;
      }
      //get total deals in june
      else if (created_atMonth == 6) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.junDeals = monthFilter.length;
      }
      //get total deals in may
      else if (created_atMonth == 5) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.mayDeals = monthFilter.length;
      }
      //get total deals in april
      else if (created_atMonth == 4) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.aprilDeals = monthFilter.length;
      }
      //get total deals in march
      else if (created_atMonth == 3) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.marDeals = monthFilter.length;
      }
      //get total deals in feb
      else if (created_atMonth == 2) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.febDeals = monthFilter.length;
      }
      //get total deals in jan
      else if (created_atMonth == 1) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        this.janDeals = monthFilter.length;
      } else {
        console.log("not valid");
      }
    });

    this.yearlyDeals = [
      this.janDeals,
      this.febDeals,
      this.marDeals,
      this.aprilDeals,
      this.mayDeals,
      this.junDeals,
      this.julDeals,
      this.augDeals,
      this.sepDeals,
      this.octDeals,
      this.novDeals,
      this.decDeals
    ];
  }

  loadOffers() {
    this.offerRestApi.getDealOffers(this.user_id).subscribe(
      data => this.handleOfferResponse(data),
      error => this.handleOfferError(error)
    );
  }
  handleOfferResponse(data) {
    let offersGraph = this.offerRestApi;

    this.Offer = data;

    //get the number of offers
    this.totalOffers = this.Offer.length;
    //get current year
    let currentYear = this.year;

    //filter to get all offers in particular year
    let yearFilter = this.Offer.filter(e => {
      let [year, _] = e.created_at.split("-");

      return currentYear === +year;
    });
    //assign offers in a particular year to a variable
    this.totalOffersThisYear = yearFilter.length;
    //loop through objects to get offers in a particular month in a year
    yearFilter.forEach((element, index, array) => {
      //getting month from date of each element
      let created_atMonth = new Date(element.created_at).getMonth() + 1;
      //getting offers in the month of dec
      if (created_atMonth == 12) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in dec
        this.decOffers = monthFilter.length;
      } else if (created_atMonth == 11) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in nov
        this.novOffers = monthFilter.length;
      } else if (created_atMonth == 10) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in oct
        this.octOffers = monthFilter.length;
      } else if (created_atMonth == 9) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in aug
        this.sepOffers = monthFilter.length;
      } else if (created_atMonth == 8) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in july
        this.augOffers = monthFilter.length;
      } else if (created_atMonth == 7) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        //get total offers in july
        this.julOffers = monthFilter.length;
      } else if (created_atMonth == 6) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in june
        this.junDeals = monthFilter.length;
      } else if (created_atMonth == 5) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in may
        this.mayOffers = monthFilter.length;
      } else if (created_atMonth == 4) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in april
        this.aprilOffers = monthFilter.length;
      } else if (created_atMonth == 3) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in march
        this.marOffers = monthFilter.length;
      } else if (created_atMonth == 2) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in feb
        this.febOffers = monthFilter.length;
      } else if (created_atMonth == 1) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in jan
        this.janOffers = monthFilter.length;
      } else {
        console.log("not valid");
      }
    });

    this.yearlyOffers = [
      this.janOffers,
      this.febOffers,
      this.marOffers,
      this.aprilOffers,
      this.mayOffers,
      this.junOffers,
      this.julOffers,
      this.augOffers,
      this.sepOffers,
      this.octOffers,
      this.novOffers,
      this.decOffers
    ];

    this.graph();
  }

  loadYearlyOffersAndDeals() {
    //get the number of offers
    this.totalOffers = this.Offer.length;
    //get searched year year

    const searchedYear = this.angularForm.value.date.getFullYear();
    this.year = searchedYear;

    let janYearlyOffers = 0;
    let febYearlyOffers = 0;
    let marYearlyOffers = 0;
    let aprilYearlyOffers = 0;
    let mayYearlyOffers = 0;
    let junYearlyOffers = 0;
    let julYearlyOffers = 0;
    let augYearlyOffers = 0;
    let sepYearlyOffers = 0;
    let octYearlyOffers = 0;
    let novYearlyOffers = 0;
    let decYearlyOffers = 0;
    //filter to get all deals in particular year
    let yearFilter = this.Offer.filter(e => {
      let [year, _] = e.created_at.split("-"); // Or, var month = e.date.split('-')[1];

      return searchedYear === +year;
    });

    //assign offers in a particular year to a variable
    this.totalOffersThisYear = yearFilter.length;
    //loop through objects to get offers in a particular month in a year
    yearFilter.forEach((element, index, array) => {
      //getting month from date of each element
      let created_atMonth = new Date(element.created_at).getMonth() + 1;
      //getting offers in the month of dec
      if (created_atMonth == 12) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in dec
        decYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 11) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in nov
        novYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 10) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in oct
        octYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 9) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in aug
        sepYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 8) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in july
        augYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 7) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });

        //get total offers in july
        julYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 6) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in june
        junYearlyDeals = monthFilter.length;
      } else if (created_atMonth == 5) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in may
        mayYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 4) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in april
        aprilYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 3) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in march
        marYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 2) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in feb
        febYearlyOffers = monthFilter.length;
      } else if (created_atMonth == 1) {
        let monthFilter = yearFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return created_atMonth === +month;
        });
        //get total offers in jan
        janYearlyOffers = monthFilter.length;
      } else {
        console.log("not valid");
      }
    });
    //assign the yearlyOffers Array with new values
    this.yearlyOffers = [
      janYearlyOffers,
      febYearlyOffers,
      marYearlyOffers,
      aprilYearlyOffers,
      mayYearlyOffers,
      junYearlyOffers,
      julYearlyOffers,
      augYearlyOffers,
      sepYearlyOffers,
      octYearlyOffers,
      novYearlyOffers,
      decYearlyOffers
    ];
    // searched year month variables
    let janYearlyDeals = 0;
    let febYearlyDeals = 0;
    let marYearlyDeals = 0;
    let aprilYearlyDeals = 0;
    let mayYearlyDeals = 0;
    let junYearlyDeals = 0;
    let julYearlyDeals = 0;
    let augYearlyDeals = 0;
    let sepYearlyDeals = 0;
    let octYearlyDeals = 0;
    let novYearlyDeals = 0;
    let decYearlyDeals = 0;
    //filter to get all deals in particular year
    let yearlyDealFilter = this.Deal.filter(e => {
      let [year, _] = e.updated_at.split("-");
      return searchedYear === +year;
    });

    //assign deals in a particular year to a variable
    this.totalDealsThisYear = yearlyDealFilter.length;
    //loop through objects to get deals in a particular month in a year
    yearlyDealFilter.forEach((element, index, array) => {
      //getting month from date of each element
      let updated_atMonth = new Date(element.updated_at).getMonth() + 1;
      //getting offers in the month of dec
      if (updated_atMonth == 12) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in dec
        decYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 11) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in nov
        novYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 10) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in oct
        octYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 9) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in aug
        sepYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 8) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in july
        augYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 7) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });

        //get total deals in july
        julYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 6) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in june
        junYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 5) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in may
        mayYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 4) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in april
        aprilYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 3) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in march
        marYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 2) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in feb
        febYearlyDeals = monthFilter.length;
      } else if (updated_atMonth == 1) {
        let monthFilter = yearlyDealFilter.filter(e => {
          let [_, month] = e.created_at.split("-");
          return updated_atMonth === +month;
        });
        //get total deals in jan
        janYearlyDeals = monthFilter.length;
      } else {
        console.log("not valid");
      }
    });

    this.yearlyDeals = [
      janYearlyDeals,
      febYearlyDeals,
      marYearlyDeals,
      aprilYearlyDeals,
      mayYearlyDeals,
      junYearlyDeals,
      julYearlyDeals,
      augYearlyDeals,
      sepYearlyDeals,
      octYearlyDeals,
      novYearlyDeals,
      decYearlyDeals
    ];

    this.graph();
  }
  handleDealError(error) {
    //this.display = false;

    console.log(error);
  }
  handleOfferError(error) {
    console.log(error);
  }
}
