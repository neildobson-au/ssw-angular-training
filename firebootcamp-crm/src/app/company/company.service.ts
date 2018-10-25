import { Injectable } from "@angular/core";
import { Company } from "./company";

@Injectable({ providedIn: "root"})
export class CompanyService {
  constructor() {}

  getCompanies(): Company[] {
    return [
      { name: "Company A", phone: 401234632, email: "some@where.com" },
      { name: "Company B", phone: 406345363, email: "who@where.com" },
      { name: "Company C", phone: 602634983, email: "me@where.com" },
      { name: "Company D", phone: 832346943, email: "they@where.com" }
    ];
  }
}
