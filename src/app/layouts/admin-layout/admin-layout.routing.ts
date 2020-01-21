import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { AdddealComponent } from "../../pages/adddeal/adddeal.component";
import { AlldealsComponent } from "../../pages/alldeals/alldeals.component";
import { DealdetailsComponent } from "../../pages/dealdetails/dealdetails.component";
import { EditdealComponent } from "../../pages/editdeal/editdeal.component";
import { OffersComponent } from "../../pages/offers/offers.component";
import { InvestorDashboardComponent } from "../../pages/investor-dashboard/investor-dashboard.component";
import { InvestorAlldealsComponent } from "../../pages/investor-alldeals/investor-alldeals.component";
import { InvestorDealdetailComponent } from "../../pages/investor-dealdetail/investor-dealdetail.component";
import { InvestorAlloffersComponent } from "../../pages/investor-alloffers/investor-alloffers.component";
import { InvestorMakeofferComponent } from "../../pages/investor-makeoffer/investor-makeoffer.component";
import { DealOffersComponent } from "../../pages/deal-offers/deal-offers.component";
import { AdminDashboardComponent } from "../../pages/admin-dashboard/admin-dashboard.component";
import { AdminAllAgentsComponent } from "../../pages/admin-all-agents/admin-all-agents.component";
import { AdminAllInvestorsComponent } from "../../pages/admin-all-investors/admin-all-investors.component";
import { AdminAlldealsComponent } from "../../pages/admin-alldeals/admin-alldeals.component";
import { AdminAlloffersComponent } from "../../pages/admin-alloffers/admin-alloffers.component";
import { AdminDealOffersComponent } from "../../pages/admin-deal-offers/admin-deal-offers.component";
import { PageNotFoundComponent } from "../../page-not-found/page-not-found.component";
import { RoleGuardService } from "../../sharedservice/guards/role-guard.service";
import { RoleGuardAdminService } from "../../sharedservice/guards/role-guard-admin.service";
import { RoleGuardInvestorService } from "../../sharedservice/guards/role-guard-investor.service";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: "adddeal",
    component: AdddealComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: "alldeals",
    component: AlldealsComponent,
    canActivate: [RoleGuardService]
  },
  { path: "offers", component: OffersComponent },
  {
    path: "investor-dashboard",
    component: InvestorDashboardComponent,
    canActivate: [RoleGuardInvestorService]
  },
  {
    path: "investor-alldeals",
    component: InvestorAlldealsComponent,
    canActivate: [RoleGuardInvestorService]
  },
  {
    path: "investor-alloffers",
    component: InvestorAlloffersComponent,
    canActivate: [RoleGuardInvestorService]
  },
  {
    path: "investor-dealdetail/:id",
    component: InvestorDealdetailComponent,
    canActivate: [RoleGuardInvestorService]
  },
  {
    path: "investor-makeoffer/:id",
    component: InvestorMakeofferComponent,
    canActivate: [RoleGuardInvestorService]
  },
  { path: "dealdetails/:id", component: DealdetailsComponent },
  {
    path: "editdeal/:id",
    component: EditdealComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: "deal-offers/:id",
    component: DealOffersComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [RoleGuardAdminService]
  },
  {
    path: "agents",
    component: AdminAllAgentsComponent,
    canActivate: [RoleGuardAdminService]
  },
  {
    path: "investors",
    component: AdminAllInvestorsComponent,
    canActivate: [RoleGuardAdminService]
  },
  {
    path: "all-deals",
    component: AdminAlldealsComponent,
    canActivate: [RoleGuardAdminService]
  },
  {
    path: "all-offers",
    component: AdminAlloffersComponent,
    canActivate: [RoleGuardAdminService]
  },
  {
    path: "admin-deal-offers/:id",
    component: AdminDealOffersComponent,
    canActivate: [RoleGuardAdminService]
  },
  {
    path: "page-not-found",
    component: PageNotFoundComponent
  }
];
