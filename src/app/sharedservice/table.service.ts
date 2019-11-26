// table.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class DevTblService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:3000";
  getDevlopers() {
    return this.http.get(`${this.url}/deals`);
  }
}
