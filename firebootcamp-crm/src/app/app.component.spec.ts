import { AppComponent } from "./app.component";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CompanyService } from "./company/company.service";
import { CompanyListComponent } from "./company/company-list/company-list.component";
import { CompanyEditComponent } from "./company/company-edit/company-edit.component";
import { CompanyTableComponent } from "./company/company-table/company-table.component";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";
import { By } from "@angular/platform-browser";

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
let companySvc: CompanyService;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      CompanyListComponent,   // Our routing module needs it
      CompanyTableComponent,  // Our routing module needs it
      CompanyEditComponent,   // Our routing module needs it
    ],
    imports: [
      AppRoutingModule, // Routerlink in AppComponent needs it
      HttpClientModule,
      ReactiveFormsModule
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
  });

  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  companySvc = TestBed.get(CompanyService);
});

describe(`Component: App Component`, () => {
  it("add 1+1 - PASS", () => {
    expect(1 + 1).toEqual(2);
  });

  it(`title equals 'Angular Superpowers'`, () => {
    expect(component.title).toEqual("Angular Superpowers");
  });

  it(`companyCount = 1`, () => {
    spyOn(companySvc, "getCompanies").and.returnValue(of([
        {
          name: "Fake Company C",
          email: "fakeEmail@ssw.com.au",
          number: 12345
        }
      ]));
    fixture.detectChanges();

    expect(component.companyCount$.subscribe(c => {
        expect(c).toEqual(1);
      }));
  });

  it(`CompanyCount HTML should update`, () => {
    spyOn(companySvc, "getCompanies").and.returnValue(of([
      {
        name: "Fake Company C",
        email: "fakeEmail@ssw.com.au",
        number: 12345
      }
    ]));
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css("#company-count")).nativeElement;
    expect(el.textContent).toEqual("1");
  });
});
