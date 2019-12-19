import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

import { AdddealComponent } from "../../pages/adddeal/adddeal.component";
import { AlldealsComponent } from "../../pages/alldeals/alldeals.component";
import { DealdetailsComponent } from "../../pages/dealdetails/dealdetails.component";
import { EditdealComponent } from "../../pages/editdeal/editdeal.component";
import { InvestorDashboardComponent } from "../../pages/investor-dashboard/investor-dashboard.component";
import { MakeOfferComponent } from "../../pages/make-offer/make-offer.component";
import { InvestorAlldealsComponent } from "../../pages/investor-alldeals/investor-alldeals.component";
import { InvestorDealdetailComponent } from "../../pages/investor-dealdetail/investor-dealdetail.component";
import { InvestorAlloffersComponent } from "../../pages/investor-alloffers/investor-alloffers.component";
import { InvestorMakeofferComponent } from "../../pages/investor-makeoffer/investor-makeoffer.component";
import { OffersComponent } from "../../pages/offers/offers.component";
import { InvestorUpdateOfferComponent } from "../../pages/investor-update-offer/investor-update-offer.component";

import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalModule, BsModalService } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2SmartTableModule,
    NgbModule,
    ModalModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    AdddealComponent,
    AlldealsComponent,
    DealdetailsComponent,
    EditdealComponent,
    OffersComponent,
    InvestorDashboardComponent,
    InvestorAlldealsComponent,
    InvestorDealdetailComponent,
    InvestorAlloffersComponent,
    InvestorMakeofferComponent,
    InvestorUpdateOfferComponent,
    MakeOfferComponent
  ],
  providers: [BsModalService],
  entryComponents: [
    MakeOfferComponent,
    InvestorUpdateOfferComponent,
    InvestorDealdetailComponent
  ]
})
export class AdminLayoutModule {}
