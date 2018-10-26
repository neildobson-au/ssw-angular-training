import { Injectable } from "@angular/core";
import { Company } from "./company";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";


@Injectable({ providedIn: "root" })
export class CompanyService {
  API_BASE = environment.API_BASE;

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  private companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  loadCompanies() {
    this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.log("TAP - Service", x)),
        catchError(e => this.errorHandler<Company[]>(e))
      )
      .subscribe(c => {
        this.companies$.next(c);
      });
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(e => this.errorHandler<Company>(e)));
  }

  deleteCompany(company: Company) {
    this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(catchError(e => this.errorHandler<Company>(e)))
      .subscribe(() => this.loadCompanies());
  }

  addCompany(company: Company) {
    this.httpClient
      .post<Company>(`${this.API_BASE}/company`, company, {
        headers: new HttpHeaders().set("content-type", "application/json")
      })
      .pipe(catchError(e => this.errorHandler<Company>(e)))
      .subscribe(() => this.loadCompanies());
  }

  updateCompany(company: Company) {
    this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company, {
        headers: new HttpHeaders().set("content-type", "application/json")
      })
      .pipe(catchError(e => this.errorHandler<Company>(e)))
      .subscribe(() => this.loadCompanies());
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error("implement custom errort handler here", error);
    return new Observable<T>();
  }
}
