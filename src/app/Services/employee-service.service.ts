import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RegisterUser } from '../Models/register-user.model';
import { AddCountry } from '../Models/add-country';
import { EmployeeAddRequest } from '../Models/employee-add-request';
import { EmployeeResponse } from '../Models/employee-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  
  baseUrl=environment.empUrl;
  header: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
  }
 // GetUserDetailApiCall(email: string): Observable<any> {
  //   return this.http.post<any>(this.baseUrl+"UserDetail?email=", email);
  // }

  AddCountryApiCall(countryName:AddCountry): Observable<any> {
    return this.http.post<any>(this.baseUrl+"AddCountries",countryName);
  }

  GetAllCountriesApiCall(): Observable<any> {
    return this.http.get<any>(this.baseUrl+"GetAllCountries").pipe(
      catchError(this.handleError)
    );
  }

  GetAllEmployeeApiCall(): Observable<any> {
    return this.http.get<any>(this.baseUrl+"GetAllEmployees");
  }

  CreateEmployeeApiCall(employeeAddRequest:EmployeeAddRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl+"Create",employeeAddRequest);
  }
  EditEmployeeApiCall(employeeAddRequest:EmployeeResponse): Observable<any> {
    console.log(employeeAddRequest);
    return this.http.put<any>(this.baseUrl+"Edit",employeeAddRequest);
  }

  DeleteEmployeeApiCall(employeeAddRequest:EmployeeResponse): Observable<any> {
    return this.http.post<any>(this.baseUrl+"Delete",employeeAddRequest);
  }


  private handleError(error: HttpErrorResponse) {
    debugger
   let errorMessage='';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        errorMessage= `Backend returned code ${error.status}, body was: `, error.message);
        
        
    }
    // Return an observable with a user-facing error message.
    errorMessage+=  'Something bad happened; please try again later.';
    return throwError(() => new Error(errorMessage));
  }

}
