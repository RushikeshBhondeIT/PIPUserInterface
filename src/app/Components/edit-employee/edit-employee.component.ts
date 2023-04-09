import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { error } from 'jquery';
import { CountryResponse } from 'src/app/Models/country-response';
import { EmployeeResponse } from 'src/app/Models/employee-response';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';
import { EmployeeSharedService } from 'src/app/SharedServices/employee-shared.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  message: string = "";
  status: string = "";
  selectedTeam: string;
  employeeObject: EmployeeResponse = new EmployeeResponse();
  newsLetter: string;
  countries: CountryResponse[];
  date:string;

  constructor(private route: ActivatedRoute,
    public employeeSharedService: EmployeeSharedService,
    private empService: EmployeeServiceService,
    private router: Router,
    private serverInfo: ServerInformationService,  
    private datePipe: DatePipe) {
    this.employeeObject.dateOfBirth = this.employeeObject.dateOfBirth;
  }

  ngOnInit() {
    this.employeeObject.employeeId = this.route.snapshot.queryParamMap.get("employeeId"); //Read Query String value
    this.employeeObject.employeeName = this.route.snapshot.queryParamMap.get("employeeName");
    this.employeeObject.gender = this.route.snapshot.queryParamMap.get("gender");
    this.employeeObject.countryName = this.route.snapshot.queryParamMap.get("countryName");
    this.employeeObject.receiveNewsLetters = JSON.parse(this.route.snapshot.queryParamMap.get("receiveNewsLetters"));
    const dateString = this.route.snapshot.queryParamMap.get("dateOfBirth");
    this.date = this.datePipe.transform(dateString, 'yyyy-MM-dd');
    console.log(this.employeeObject.dateOfBirth);
    this.employeeObject.countryId = this.route.snapshot.queryParamMap.get("countryId");
    this.employeeObject.email = this.route.snapshot.queryParamMap.get("email");
    this.employeeObject.age = this.route.snapshot.queryParamMap.get("age");
    this.employeeObject.address = this.route.snapshot.queryParamMap.get("address");
    this.getAllCountries();
  }
  
   
  getAllCountries() {
    this.empService.GetAllCountriesApiCall().subscribe(res => {
      if (res) {
        this.countries = res;
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('Error',
        error.error.message,
        'error',
        false,)
      this.router.navigateByUrl('/dashboard');
    });
  }

  selectCountry(value: string): void {
    this.employeeObject.countryName = value;
  }

  convertToBoolean(value: string) {
    const booleanTrue: boolean = JSON.parse(value)  // Returns true
    const booleanFalse: boolean = JSON.parse(value)
  }
  onSelected(values: string): void {
    this.selectedTeam = values;
    this.employeeObject.gender = this.selectedTeam;
  }

  NewsLetterSelected(value: string): void {
    this.newsLetter = value;
    this.employeeObject.receiveNewsLetters = JSON.parse(this.newsLetter);
  }

  EditUserfunction() {
    this.employeeObject.dateOfBirth= new Date(this.date)
    this.empService.EditEmployeeApiCall(this.employeeObject).subscribe(res => {
      if (res) {
        this.employeeObject = res;
        this.serverInfo.showSuccessMessage('Edited Successfully!',
          this.message,
          'success',
          false,)
        this.router.navigateByUrl('/dashboard')
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('Error',
        error.error.message,
        'error',
        false,)
      this.router.navigateByUrl('/dashboard');
    });
  }
}

