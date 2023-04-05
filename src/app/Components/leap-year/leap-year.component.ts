import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  leapYearsWithDayResponse: [] = [];
  message: string = ""
  status: string = ""
  searchItem: Date;
  startYear: number;
  endYear: number;
  startDate: Date;
  endDate: Date;


  constructor(private empService: EmployeeServiceService,
    private localStorage: LocalStorageService,
    private router: Router,
    private serverInfo: ServerInformationService,
    public datepipe: DatePipe) {
  }

  leapYearWithDay() {
    this.serverInfo.GetLeapYearsDayApiCall(this.startDate, this.endDate).subscribe(res => {
      if (res != null) {

        let data = res;
        let projectNames = data.map(item => {
          this.leapYearsWithDayResponse = item
        });
      }
    });
  }


  LeapYear() {
    alert('method called');
    this.serverInfo.GetLeapYearsApiCall(this.startYear, this.endYear).subscribe(res => {
      if (res != null) {
        this.leapYearsResponse = res
      }
    });
  }


  GetDay() {
    var someDateVar = this.datepipe.transform(this.searchItem, 'MM-dd-YYYY');
    this.serverInfo.GetDayTimeApiCall(someDateVar).subscribe(res => {
      if (res != null) {
        this.message = res.message;
      }
    }, e => {
      this.serverInfo.showErrorMessage('Error',
        'DateTime is null !',
        'error',
        true,)
      this.router.navigateByUrl('/dashboard');
    });
  }
}
