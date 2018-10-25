import { Injectable } from "@angular/core";
import { Company } from "./company";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class CompanyService {
  API_BASE = "http://firebootcamp-crm-api.azurewebsites.net/api";

  constructor(private httpClient: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`);
  }
}
