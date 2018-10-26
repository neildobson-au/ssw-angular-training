import { AppComponent } from "./app.component";
import { of } from "rxjs";

let component;
let companySvc;

beforeEach(() => {
  companySvc = {
    getCompanies: () => { }
  };
  component = new AppComponent(companySvc);
});

describe(`Component: App Component`, () => {
  it("add 1+1 - PASS", () => {
    expect(1 + 1).toEqual(2);
  });

  it(`title equals 'Angular Superpowers'`, () => {
    expect(component.title).toEqual("Angular Superpowers");
  });

  it(`companyCount = 2`, () => {
    spyOn(companySvc, "getCompanies").and.returnValue(of([
        {
          name: "Fake Company A",
          email: "fakeEmail@ssw.com.au",
          number: 12345
        },
        {
          name: "Fake Company B",
          email: "fakeEmail@ssw.com.au",
          number: 12345
        }
      ]));
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    });
  });
});
