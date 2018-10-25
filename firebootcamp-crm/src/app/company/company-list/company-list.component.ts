import { Component, OnInit } from "@angular/core";
import { Company } from "../company";
import { CompanyService } from "../company.service";
import { Observable } from "rxjs";
import { tap, finalize } from "rxjs/operators";

@Component({
  selector: "fbc-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.scss"]
})
export class CompanyListComponent implements OnInit {
  public companies$: Observable<Company[]>;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companies$ = this.companyService.getCompanies().pipe(
      tap(x => console.log("TAP - Component", x)),
      finalize(() => console.log("Finalize: Complete"))
    );
  }

  deleteCompany(company: Company) {
    this.companyService
      .deleteCompany(company)
      .subscribe(() => this.loadCompanies());
  }
}
