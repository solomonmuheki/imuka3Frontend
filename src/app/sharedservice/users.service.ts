import { Injectable } from "@angular/core";
import { User } from "./user";
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
export class UsersService {
  baseURL = "http://localhost:8000/api";

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
    this.offerIdData = this.offerIdSource.asObservable();
  }

  // Get all Users
  getUsers() {
    return this.http.get(this.baseURL + "/users");
  }
  // Get all deals
  getDeals(): Observable<Deal> {
    return this.http
      .get<Deal>(this.baseURL + "/deals")
      .pipe(retry(1), catchError(this.handleError));
  }
  //get agent users
  getUserAgents(user_role): Observable<Offer> {
    return this.http
      .get<Offer>(this.baseURL + "/user-agent/" + user_role)
      .pipe(retry(1), catchError(this.handleError));
  }
  //get investor users
  getUserInvestors(user_role): Observable<Offer> {
    return this.http
      .get<Offer>(this.baseURL + "/user-investor/" + user_role)
      .pipe(retry(1), catchError(this.handleError));
  }
  //get deal offers
  getDealOffers(deal_id): Observable<Offer> {
    return this.http.get<Offer>(this.baseURL + "/deal-offers/" + deal_id);
  }

  //verify user method
  verifyUser(id, data): Observable<any> {
    let url = `${this.baseURL}/verify-user/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //De-verify user method
  deverifyUser(id, data): Observable<any> {
    let url = `${this.baseURL}/verify-user/${id}`;
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
  //updating the offer amount on a particular deal
  updateOffer(id, offer): Observable<Offer> {
    return this.http
      .put<Offer>(
        this.baseURL + "/offer/update/" + id,
        JSON.stringify(offer),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //delete agent user
  deleteAgentUser(id: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .delete<number>(this.baseURL + "/user-agent/delete/" + id, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  //delete investor user
  deleteInvestorUser(id): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .delete<number>(this.baseURL + "/user-investor/delete/" + id, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOffer(id): Observable<Offer> {
    return this.http
      .get<Offer>(this.baseURL + "/offer/" + id)
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
    return throwError(errorMessage);
  }
}
