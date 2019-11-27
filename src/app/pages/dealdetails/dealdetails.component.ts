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
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.restApi.getDeal(id).subscribe(data =>
      
      {
        var companyName=data[0]['companyName'];
     
        console.log(companyName);
      console.log(data);

     
      console.log("hello2:"+data[0]['companyName'])
    
      
    })
  }
  
}
