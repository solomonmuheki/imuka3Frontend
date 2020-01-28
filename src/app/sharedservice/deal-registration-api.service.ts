import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { Deal } from "./deal";

@Injectable({
  providedIn: "root"
})
export class DealRegistrationApiService {
  //baseURL = "http://localhost:8000/api";
  baseURL = "http://3.91.247.160/api";

  headers = new HttpHeaders().set("Content-Type", "application/json");
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  constructor(private http: HttpClient) {}
  //get all deals
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
  //get deals for a particular user
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

  //update deal status method
  updateDealStatus(id, data): Observable<any> {
    let url = `${this.baseURL}/deal/deal-status/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //update deal  method
  updateDeal(id, data): Observable<any> {
    let url = `${this.baseURL}/deal/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //delete deal method
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
