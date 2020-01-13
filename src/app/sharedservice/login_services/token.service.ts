import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";

@Injectable()
export class TokenService {
  private iss = {
    login: "http://localhost:8000/api/login",
    signup: "http://localhost:8000/api/signup"
  };

  constructor() {}

  handle(token, expires_in, user_role, user_id, status) {
    this.set(token);
    this.setExpires_in(expires_in);
    this.setUserRole(user_role);
    this.setUser_id(user_id);
    this.setStatus(status);
  }

  set(token) {
    localStorage.setItem("token", token);
  }
  setExpires_in(expires_in) {
    localStorage.setItem("Expires in", expires_in);
  }
  setUserRole(user_role) {
    localStorage.setItem("user_role", user_role);
  }
  setUser_id(user_id) {
    localStorage.setItem("user_id", user_id);
  }
  setStatus(status) {
    localStorage.setItem("status", status);
  }
  get() {
    return localStorage.getItem("token");
  }

  remove() {
    localStorage.removeItem("token");
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split(".")[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.get();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
