import { Injectable } from "@angular/core";
import { Company } from "./company";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { tap } from "rxjs/operators";


@Injectable({ providedIn: "root" })
export class CompanyService {
  API_BASE = "http://firebootcamp-crm-api.azurewebsites.net/api";

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.log("TAP - Service", x)),
        catchError(e => this.errorHandler<Company[]>(e))
      );
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(catchError(e => this.errorHandler<Company>(e)));
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error("implement custom errort handler here", error);
    return new Observable<T>();
  }
}
