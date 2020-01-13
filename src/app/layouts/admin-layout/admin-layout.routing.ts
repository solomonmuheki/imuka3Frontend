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

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "adddeal", component: AdddealComponent },
  { path: "alldeals", component: AlldealsComponent },
  { path: "offers", component: OffersComponent },
  { path: "investor-dashboard", component: InvestorDashboardComponent },
  { path: "investor-alldeals", component: InvestorAlldealsComponent },
  { path: "investor-alloffers", component: InvestorAlloffersComponent },
  { path: "investor-dealdetail/:id", component: InvestorDealdetailComponent },
  { path: "investor-makeoffer/:id", component: InvestorMakeofferComponent },
  { path: "dealdetails/:id", component: DealdetailsComponent },
  { path: "editdeal/:id", component: EditdealComponent },
  { path: "deal-offers/:id", component: DealOffersComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent },
  { path: "agents", component: AdminAllAgentsComponent },
  { path: "investors", component: AdminAllInvestorsComponent },
  { path: "all-deals", component: AdminAlldealsComponent },
  { path: "all-offers", component: AdminAlloffersComponent }
];
