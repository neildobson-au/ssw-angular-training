import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Company } from "../company";

@Component({
  selector: "fbc-company-table",
  templateUrl: "./company-table.component.html",
  styleUrls: ["./company-table.component.scss"]
})
export class CompanyTableComponent implements OnInit {

  @Input()
  companies: Company[];

  @Output()
  deleteClicked = new EventEmitter<Company>();

  constructor() { }

  ngOnInit() {
  }

  deleteCompany(company: Company) {
    console.log(company);
    this.deleteClicked.emit(company);
  }
}
