import { Component, OnInit } from '@angular/core';
import { Company } from "../company";

@Component({
  selector: "fbc-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.scss"]
})
export class CompanyListComponent implements OnInit {
  companies: Company[];

  constructor() {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies = [
      { name: "Company A", phone: 401234632, email: "some@where.com" },
      { name: "Company B", phone: 406345363, email: "who@where.com" },
      { name: "Company C", phone: 602634983, email: "me@where.com" },
      { name: "Company D", phone: 832346943, email: "they@where.com" }
    ];
  }
}
