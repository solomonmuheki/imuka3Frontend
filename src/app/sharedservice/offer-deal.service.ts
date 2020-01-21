import { Injectable } from "@angular/core";
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

  //get User offers
  getUserOffers(user_id): Observable<Offer> {
    return this.http
      .get<Offer>(this.baseURL + "/user-offers/" + user_id)
      .pipe(retry(1), catchError(this.handleError));
  }
  //get deal offers
  getDealOffers(deal_id): Observable<Offer> {
    return this.http.get<Offer>(this.baseURL + "/deal-offers/" + deal_id);
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
  //update offer
  updateOffer(id, offer): Observable<Offer> {
    return this.http
      .put<Offer>(
        this.baseURL + "/offer/update/" + id,
        JSON.stringify(offer),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //delete offer
  deleteOffer(id: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .delete<number>(this.baseURL + "/offer/delete/" + id, httpOptions)
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
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
