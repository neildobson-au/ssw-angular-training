import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: any;

  constructor() { }

  ngOnInit() {
    this.companies = this.getCompanies();
  }

  getCompanies() {
    return [
      { name: 'Company A', phone: '0401 234632', email: 'some@where.com' },
      { name: 'Company B', phone: '0406 345363', email: 'who@where.com' },
      { name: 'Company C', phone: '0602 634983', email: 'me@where.com' },
      { name: 'Company D', phone: '0832 346943', email: 'they@where.com' },
    ];
  }
}
