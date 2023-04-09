import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { CountryResponse } from 'src/app/Models/country-response';
import { EmployeeAddRequest } from 'src/app/Models/employee-add-request';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  selectedTeam: string = "";
  employeeAddRequest: EmployeeAddRequest = new EmployeeAddRequest()
  newsLetter: string;
  message: string;
  countries: CountryResponse[];

  constructor(private empService: EmployeeServiceService,
    private router: Router,
    private localStorage: LocalStorageService,
    private serverInfo: ServerInformationService,
   ) {
    this.getAllCountries();
  }

  getAllCountries() {
    this.empService.GetAllCountriesApiCall().subscribe(res => {
      if (res) {
        this.countries = res;
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

  selectCountry(value: string): void {

    this.employeeAddRequest.countryName = value;
  }

  selectGender(value: string): void {

    this.employeeAddRequest.gender = value;
  }

  NewsLetterSelected(value: string): void {
    this.newsLetter = value;
    this.employeeAddRequest.receiveNewsLetters = JSON.parse(this.newsLetter);
  }

  CreateEmployee() {
    if (this.localStorage.isLoggedIn() == true) {
      this.empService.CreateEmployeeApiCall(this.employeeAddRequest).subscribe(res => {
        this.message = res.message;
        if (res != null) {
          this.serverInfo.showSuccessMessage('Profile Created',
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

}
