import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from '../Models/register-user.model';
import { AddCountry } from '../Models/add-country';
import { EmployeeAddRequest } from '../Models/employee-add-request';
import { EmployeeResponse } from '../Models/employee-response';

@Injectable({
  providedIn: 'root'
})
export class ServerInformationService {

  header: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
  }
  GetServerTimeApiCall(): Observable<any> {
    alert("AddCountryApiCall service called");
    return this.http.get<any>("https://localhost:7115/GetServerTime");
  }
  GetDayTimeApiCall(dateTime:string): Observable<any> {
    alert("AddCountryApiCall service called");
    return this.http.get<any>("https://localhost:7115/GetDay"+dateTime);
  }

  GetLeapYearsTimeApiCall(startYear:number,endYear:number): Observable<any> {
    alert("AddCountryApiCall service called");
    return this.http.get<any>("https://localhost:7010/LeapYears?StartYear="+startYear+"&EndYear="+endYear);
  }
  GetLeapYearsDayTimeApiCall(startYear:Date,endYear:Date): Observable<any> {
    alert("AddCountryApiCall service called");
    return this.http.get<any>("https://localhost:7010/LeapYearsDay?startDate="+startYear+"&endDate="+endYear);
  }


}
