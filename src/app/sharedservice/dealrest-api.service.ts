import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Deal } from "../sharedservice/deal";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class DealrestApiService {
  // Define API
  apiURL = "http://localhost:8000/api";
//  apiURL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  // HttpClient API get() method => Fetch deals list
  getDeals(): Observable<Deal> {
    return this.http
      .get<Deal>(this.apiURL + "/deals")
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch deal
  getDeal(id): Observable<Deal> {
    return this.http
      .get<Deal>(this.apiURL + "/deals/" + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  createDeal(deal): Observable<Deal> {
    return this.http
      .post<Deal>(
        this.apiURL + "/deals",
        JSON.stringify(deal),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update employee
  updateDeal(id, deal): Observable<Deal> {
    return this.http
      .put<Deal>(
        this.apiURL + "/deals/" + id,
        JSON.stringify(deal),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete employee
  // deleteDeal(id) {
  //   return this.http
  //     .delete<Deal>(this.apiURL + "/deal/delete/" + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  
  deleteDeal(id:string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.apiURL + '/deals/delete/'+id,  
 httpOptions)
 .pipe(retry(1), catchError(this.handleError));  
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
