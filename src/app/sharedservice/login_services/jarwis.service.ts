import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable()
export class JarwisService {
  private baseUrl = "http://35.173.247.160/api";

  constructor(private http: HttpClient) {}

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
    //.pipe(retry(1), catchError(this.handleError));
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
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
