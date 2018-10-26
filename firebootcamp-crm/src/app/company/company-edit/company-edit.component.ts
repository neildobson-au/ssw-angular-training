import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../company.service";
import { Company } from "../company";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "fbc-company-edit",
  templateUrl: "./company-edit.component.html",
  styleUrls: ["./company-edit.component.scss"]
})
export class CompanyEditComponent implements OnInit {
  company = {} as Company;
  companyId: number;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.companyId = parseInt(this.activatedRoute.snapshot.params["id"], 10);
    this.isNewCompany = this.companyId === 0;
    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  buildForm(): void {
    this.companyForm = this.fb.group({
      name: ["", Validators.required],
      phone: [""],
      email: [""]
    });
  }

  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService
        .addCompany(this.companyForm.value)
        .subscribe(() => this.router.navigateByUrl("/company/list"));
    } else {
      const newCompany = { ...this.companyForm.value, id: this.companyId };
      this.companyService
        .updateCompany(newCompany)
        .subscribe(() => this.router.navigateByUrl("/company/list"));
    }
  }

  getCompany(): void {
    this.companyService.getCompany(this.companyId)
      .subscribe(company => {
        this.companyForm.patchValue(company);
      });
  }
}
