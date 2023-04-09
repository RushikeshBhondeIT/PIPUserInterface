import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeResponse } from 'src/app/Models/employee-response';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';
import { DatePipe } from '@angular/common';
import { error } from 'jquery';
import { AddCountry } from 'src/app/Models/add-country';
import { CountryResponse } from 'src/app/Models/country-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  employees: EmployeeResponse[] = [];
  message: string = ""
  status: string = ""
  searchItem: Date;
  searchText: string;
  employeeResponseObject: EmployeeResponse;
  errorMessage: any;
  addCountries: AddCountry = new AddCountry();
  countryRespose: CountryResponse = new CountryResponse();

  constructor(private empService: EmployeeServiceService,
    private localStorage: LocalStorageService,
    private router: Router,
    private serverInfo: ServerInformationService,
    public datepipe: DatePipe) {
  }
  displayedColumns: string[] = ['employeeId', 'employeeName', 'email', 'dateOfBirth', 'gender', 'countryName', 'address', 'NewsLetters', 'age'];

  ngOnInit() {
    this.GetAllEmployee();
    this.employees = this.GetAllEmployee();
  }

  GetDay() {
    var someDateVar = this.datepipe.transform(this.searchItem, 'MM-dd-YYYY');
    this.serverInfo.GetDayTimeApiCall(someDateVar).subscribe(res => {
      if (res != null) {
        this.message = res.message;
      }
    }, error => {
      console.log(error);
      this.serverInfo.showErrorMessage('Error',
        'DateTime is null !',
        'error',
        false,)
      this.router.navigateByUrl('/dashboard');
    });
  }

  GetAllEmployee() {
    if (this.localStorage.isLoggedIn() == true) {
      this.empService.GetAllEmployeeApiCall().subscribe(res => {
        if (res != null || res.status == "Success") {
          this.employees = res
          this.status = res.status;
          this.message = res.message;
        }
      }, (error) => {
        this.errorMessage = error.message + ' ' + ', Something went wrong!';
        console.log(this.errorMessage);
      });
    }
    return this.employees;
  }

  CreateEmployee() {
    if (this.localStorage.isLoggedIn() == true) {
      this.router.navigateByUrl('/create-employee')
    }
  }

  Editinvoice(employee: EmployeeResponse) {
    if (this.localStorage.isLoggedIn() == true) {
      this.router.navigate(['/edit-employee'], { queryParams: { ...employee } });
    }
  }

  DeleteEmployee(employee: EmployeeResponse) {
    if (this.localStorage.isLoggedIn() == true) {
      this.empService.DeleteEmployeeApiCall(employee).subscribe(res => {
        this.message = res.message;
        if (res != null) {
          this.serverInfo.showSuccessMessage('Profile Deleted',
            this.message,
            'success',
            false,)
          this.router.navigateByUrl('/dashboard');
        }
      }, error => {
        console.log(error);
        this.serverInfo.showErrorMessage('Error',
          error.error.message,
          'error',
          false,)
        this.router.navigateByUrl('/dashboard');
      });
    }
  }


  AddCountry() {
    this.empService.AddCountryApiCall(this.addCountries).subscribe(res => {
      if (res) {
        this.countryRespose.countryId = res.countryId,
          this.countryRespose.countryName = res.countryName
        this.serverInfo.showSuccessMessage('Success',
          res.message,
          'success',
          false,)
      }

    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('error',
        error.error.message,
        'error',
        false,)
    });
  }
}
