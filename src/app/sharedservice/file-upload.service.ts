import { Injectable } from "@angular/core";
//import { User } from './user';
import { Observable, throwError } from "rxjs";
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { Deal } from "../sharedservice/deal";
@Injectable({
  providedIn: "root"
})
export class FileUploadService {
  baseURL = "http://localhost:8000/api";
  baseURL2 = "http://localhost:8000/api/deals";
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
    return this.http.get(this.baseURL2);
  }
  getDeals(): Observable<Deal> {
    return this.http
      .get<Deal>(this.baseURL + "/deals")
      .pipe(retry(1), catchError(this.handleError));
  }
  // Create User
  addUser(
    user_id: number,
    companyName: string,
    companyType: string,
    companyIndustry: string,
    companyAddress: string,
    companyTel: string,
    companyEmail: string,
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
    // formData.append("companyType", companyType);
    // formData.append("companyIndustry", companyIndustry);
    // formData.append("Address", companyAddress);
    // formData.append("telephone", companyTel);
    // formData.append("email", companyEmail);
    // formData.append("AmountToRaise", raisedAmount);
    // formData.append("detailedDescription", DealDetailedDesc);
    // formData.append("image", profileImage);
    // formData.append("businessPlan", cbBussinessPlan);
    // formData.append("MOU", cbMou);
    // formData.append("certificateOfRegistration", cbCertificateOfRegistration);
    // formData.append("financialStatement", cbFinancialStatement);
    // formData.append("cashFlowStatement", cbCashFlowStatement);
    // formData.append("contractDocument", cbContractDocument);
    // formData.append("auditedAccounts", cbAuditedAccounts);
    return this.http
      .put<Deal>(this.baseURL + "/deals/" + id, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  updateProduct(data) {
    return this.http.post(this.baseURL + "update.php", data);
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
