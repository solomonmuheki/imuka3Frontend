import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { RoleGuardService } from "../../sharedservice/guards/role-guard.service";
import { RoleGuardAdminService } from "../../sharedservice/guards/role-guard-admin.service";
import { RoleGuardInvestorService } from "../../sharedservice/guards/role-guard-investor.service";

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
import { DealOffersComponent } from "../../pages/deal-offers/deal-offers.component";
import { AdminDealOffersComponent } from "../../pages/admin-deal-offers/admin-deal-offers.component";
import { PageNotFoundComponent } from "../../page-not-found/page-not-found.component";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { IntersectingCirclesSpinnerModule } from "angular-epic-spinners";
import { HalfCircleSpinnerModule } from "angular-epic-spinners";
import { AngularMaterialModule } from "../../angular-material/angular-material.module";
import { AdminDashboardComponent } from "../../pages/admin-dashboard/admin-dashboard.component";
import { AdminAllAgentsComponent } from "../../pages/admin-all-agents/admin-all-agents.component";
import { AdminAllInvestorsComponent } from "../../pages/admin-all-investors/admin-all-investors.component";
import { AdminAlldealsComponent } from "../../pages/admin-alldeals/admin-alldeals.component";
import { AdminAlloffersComponent } from "../../pages/admin-alloffers/admin-alloffers.component";
import { OrderModule } from "ngx-order-pipe";
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
    NgxSpinnerModule,
    AngularMaterialModule,
    OrderModule,
    IntersectingCirclesSpinnerModule,
    HalfCircleSpinnerModule,

    ModalModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    AdddealComponent,
    AlldealsComponent,
    DealdetailsComponent,
    EditdealComponent,
    OffersComponent,
    DealOffersComponent,
    InvestorDashboardComponent,
    InvestorAlldealsComponent,
    InvestorDealdetailComponent,
    InvestorAlloffersComponent,
    InvestorMakeofferComponent,
    InvestorUpdateOfferComponent,
    MakeOfferComponent,
    AdminDashboardComponent,
    AdminAllAgentsComponent,
    AdminAllInvestorsComponent,
    AdminAlldealsComponent,
    AdminAlloffersComponent,
    AdminDealOffersComponent,
    PageNotFoundComponent
  ],
  providers: [
    BsModalService,
    RoleGuardService,
    RoleGuardAdminService,
    RoleGuardInvestorService
  ],
  entryComponents: [
    MakeOfferComponent,
    InvestorUpdateOfferComponent,
    InvestorDealdetailComponent
  ]
})
export class AdminLayoutModule {}
