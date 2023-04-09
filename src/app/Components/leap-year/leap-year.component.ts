import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { LeapYearDayResponse } from 'src/app/Models/leap-year-day-response';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';

@Component({
  selector: 'app-leap-year',
  templateUrl: './leap-year.component.html',
  styleUrls: ['./leap-year.component.css']
})
export class LeapYearComponent {
  searchText: string;
  leapYearsResponse: [] = [];
  leapYearsWithDayResponse: LeapYearDayResponse[] = [];
  message: string = ""
  status: string = ""
  searchItem: Date;
  startYear: number;
  endYear: number;
  startDate: Date;
  endDate: Date;
  errMessage: any;

  constructor(private empService: EmployeeServiceService,
    private localStorage: LocalStorageService,
    private router: Router,
    private serverInfo: ServerInformationService,
    public datepipe: DatePipe) {
  }

  leapYearWithDay() {
    var someDateVar = this.datepipe.transform(this.searchItem, 'MM-dd-YYYY');
    this.serverInfo.GetLeapYearsDayApiCall(this.startDate, this.endDate).subscribe(res => {
      if (res) {
        this.leapYearsWithDayResponse = res;
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('error',
        error.error.message,
        'error',
        false,)
    });
  }


  LeapYear() {
    this.serverInfo.GetLeapYearsApiCall(this.startYear, this.endYear).subscribe(res => {
      if (res) {
        this.leapYearsResponse = res
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('Error',
        this.errMessage = error.error.message + ' ' + ', Something went wrong!',
        'error',
        false,)
      this.router.navigateByUrl('/dashboard');
    });
  }


  GetDay() {
    var someDateVar = this.datepipe.transform(this.searchItem, 'MM-dd-YYYY');
    this.serverInfo.GetDayTimeApiCall(someDateVar).subscribe(res => {
      if (res) {
        this.message = res.message;
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('Error',
        'DateTime is null !',
        'error',
        false,)
      this.router.navigateByUrl('/dashboard');
    });
  }
}
