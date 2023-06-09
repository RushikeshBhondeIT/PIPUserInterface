import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LogInModel } from '../Models/log-in-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerInformationService {
  urlemp=environment.empUrl
  urlLeap=environment.serverUrl;
  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
  }

  GetServerTimeApiCall(): Observable<any> {
    return this.http.get<any>(this.urlemp+"GetServerTime");
  }
  GetDayTimeApiCall(dateTime:string): Observable<any> {
    return this.http.get<any>(this.urlemp+"GetDay?dateTime="+dateTime);
  }

  GetLeapYearsApiCall(startYear:number,endYear:number): Observable<any> {
    return this.http.get<any>(this.urlLeap+"LeapYears?StartYear="+startYear+"&EndYear="+endYear);
  }
  
  GetLeapYearsDayApiCall(startYear:Date,endYear:Date): Observable<any> {
    return this.http.get<any>(this.urlLeap+"LeapYearsDay?startDate="+startYear+"&endDate="+endYear);
  }

  logInToLeapYearsApiCall(loginModel:LogInModel): Observable<any> {
    return this.http.post<any>(this.urlLeap+'LogIn',loginModel);
  }

  showErrorMessage(
    title, message, icon = null,
    showCancelButton = true) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      showCancelButton: showCancelButton
    })
  }

  showSuccessMessage(
    title, message, icon = null,
    showCancelButton = true) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })
  }

}
