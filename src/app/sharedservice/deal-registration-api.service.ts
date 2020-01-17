import { Injectable } from "@angular/core";
//import { User } from './user';
import { Observable, throwError } from "rxjs";
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { Deal } from "./deal";
import { Offer } from "./offer";

@Injectable({
  providedIn: "root"
})
export class DealRegistrationApiService {
  baseURL = "http://localhost:8000/api";

  headers = new HttpHeaders().set("Content-Type", "application/json");
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  constructor(private http: HttpClient) {}

  // Get Users
  getUsers() {
    return this.http.get(this.baseURL + "/deals");
  }
  getDeals(): Observable<Deal> {
    return this.http
      .get<Deal>(this.baseURL + "/deals")
      .pipe(retry(1), catchError(this.handleError));
  }
  //get one deal with a specific id
  getDeal(id): Observable<Deal> {
    return this.http
      .get<Deal>(this.baseURL + "/deals/" + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  getUserDeals(user_id): Observable<Deal> {
    return this.http
      .get<Deal>(this.baseURL + "/user-deals/" + user_id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Create User
  addDeal(
    user_id: number,
    companyName: string,
    companyType: string,
    companyIndustry: string,
    companyAddress: string,
    companyTel: string,
    companyEmail: string,
    rateDeal: number,
    status: number,
    raisedAmount: string,
    DealDetailedDesc: string,
    profileImage: File,
    cbBussinessPlan: number,
    cbMou: number,
    cbCertificateOfRegistration: number,
    cbFinancialStatement: number,
    cbCashFlowStatement: number,
    cbContractDocument: number,
    cbAuditedAccounts: number
  ): Observable<any> {
    var formData: any = new FormData();
    formData.append("user_id", user_id);
    formData.append("companyName", companyName);
    formData.append("companyType", companyType);
    formData.append("companyIndustry", companyIndustry);
    formData.append("Address", companyAddress);
    formData.append("telephone", companyTel);
    formData.append("email", companyEmail);
    formData.append("rating", rateDeal);
    formData.append("status", status);
    formData.append("AmountToRaise", raisedAmount);
    formData.append("detailedDescription", DealDetailedDesc);
    formData.append("image", profileImage);
    formData.append("businessPlan", cbBussinessPlan);
    formData.append("MOU", cbMou);
    formData.append("certificateOfRegistration", cbCertificateOfRegistration);
    formData.append("financialStatement", cbFinancialStatement);
    formData.append("cashFlowStatement", cbCashFlowStatement);
    formData.append("contractDocument", cbContractDocument);
    formData.append("auditedAccounts", cbAuditedAccounts);

    return this.http.post<Deal>(`${this.baseURL}/deals`, formData, {
      reportProgress: true,
      observe: "events"
    });
  }
  // HttpClient API put() method => Update employee
  updateDeal(id, companyName: string): Observable<any> {
    var formData: any = new FormData();

    formData.append("companyName", companyName);

    return this.http
      .put<Deal>(this.baseURL + "/deals/" + id, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  //update deal status method
  updateDealStatus(id, data): Observable<any> {
    let url = `${this.baseURL}/deal/deal-status/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  updateDeal2(id, deal): Observable<Deal> {
    return this.http
      .put<Deal>(this.baseURL + "/deals/" + id, deal, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseURL}/deal/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //get all offers
  getOffers(): Observable<Offer> {
    return this.http
      .get<Offer>(this.baseURL + "/offers")
      .pipe(retry(1), catchError(this.handleError));
  }
  //Register an offer
  addOffer(
    user_id: number,
    deal_id: number,
    offer_amount: string
  ): Observable<any> {
    var formData: any = new FormData();
    formData.append("user_id", user_id);
    formData.append("deal_id", deal_id);
    formData.append("offer_amount", offer_amount);

    return this.http.post<Deal>(`${this.baseURL}/offer`, formData, {
      reportProgress: true,
      observe: "events"
    });
  }
  deleteDeal(id: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .delete<number>(this.baseURL + "/deal/delete/" + id, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
