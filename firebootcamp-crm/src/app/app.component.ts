import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CompanyService } from "./company/company.service";
import { map } from "rxjs/operators";

@Component({
  selector: "fbc-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  prodMode: boolean;
  companyCount$: Observable<number>;
  title = "firebootcamp-crm";

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.prodMode = environment.production;
    this.companyCount$ = this.companyService.getCompanies().pipe(map(c => c.length));
  }
}
