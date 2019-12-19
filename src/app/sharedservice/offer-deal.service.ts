import { Injectable } from "@angular/core";
//import { User } from './user';
import { Observable, throwError } from "rxjs";
import { BehaviorSubject } from "rxjs";
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { Deal } from "../sharedservice/deal";
import { Offer } from "../sharedservice/offer";

@Injectable({
  providedIn: "root"
})
export class OfferDealService {
  baseURL = "http://localhost:8000/api";
  baseURL2 = "http://localhost:8000/api/deals";
  headers = new HttpHeaders().set("Content-Type", "application/json");
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  offerIdSource = new BehaviorSubject<number>(0);
  offerIdData: any;
  constructor(private http: HttpClient) {
    //this.baseURL ="https://localhost:44314/api/post/";
    this.offerIdData = this.offerIdSource.asObservable();
  }

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
  //investor update offer method
  updateOffer2(id, offer): Observable<Offer> {
    return this.http
      .put<Offer>(this.baseURL + "/offers/" + id, offer, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseURL}/deal/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //confirm offer method
  confirmOffer(id, data): Observable<any> {
    let url = `${this.baseURL}/offer/reject-offer/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //reject offer method
  rejectOffer(id, data): Observable<any> {
    let url = `${this.baseURL}/offer/confirm-offer/${id}`;
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
    offer_amount: string,
    status: number
  ): Observable<any> {
    var formData: any = new FormData();
    formData.append("user_id", user_id);
    formData.append("deal_id", deal_id);
    formData.append("offer_amount", offer_amount);
    formData.append("status", status);

    return this.http.post<Deal>(`${this.baseURL}/offer`, formData, {
      reportProgress: true,
      observe: "events"
    });
  }
  changeOfferId(offerId: number) {
    this.offerIdSource.next(offerId);
  }
  // updateOffer(post: any) {
  //   let header = new HttpHeaders();
  //   header.append("Content-Type", "applications/json");
  //   return this.http.post(this.baseURL + "updatepost", post, {
  //     headers: header
  //   });
  // }
  updateOffer(id, offer): Observable<Offer> {
    return this.http
      .put<Offer>(
        this.baseURL + "/offer/update/" + id,
        JSON.stringify(offer),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteOffer(id: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .delete<number>(this.baseURL + "/offer/delete/" + id, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // getOffer(offerId: number) {
  //   let header = new HttpHeaders();
  //   header.append("Content-Type", "applications/json");
  //   let url = `${this.baseURL}/offer/${offerId}`;
  //   return this.http.get(url, {
  //     headers: header
  //   });
  // }
  getOffer(id): Observable<Offer> {
    return this.http
      .get<Offer>(this.baseURL + "/offer/" + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  getCategoryList() {
    let header = new HttpHeaders();
    header.append("Content-Type", "applications/json");
    return this.http.get(this.baseURL + "getcategories", { headers: header });
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
