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
export class EmployeeServiceService {
  header: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
  }

  AddCountryApiCall(countryName:AddCountry): Observable<any> {
    return this.http.post<any>("https://localhost:7115/AddCountries",countryName);
  }
  GetAllCountriesApiCall(): Observable<any> {
    return this.http.get<any>("https://localhost:7115/GetAllCountries");
  }

  GetAllEmployeeApiCall(): Observable<any> {
    return this.http.get<any>("https://localhost:7115/GetAllEmployees");
  }

  CreateEmployeeApiCall(employeeAddRequest:EmployeeAddRequest): Observable<any> {
    return this.http.post<any>("https://localhost:7115/Create",employeeAddRequest);
  }
  EditEmployeeApiCall(employeeAddRequest:EmployeeResponse): Observable<any> {
    console.log(employeeAddRequest);
    return this.http.put<any>("https://localhost:7115/Edit",employeeAddRequest);
  }

  DeleteEmployeeApiCall(employeeAddRequest:EmployeeResponse): Observable<any> {
    return this.http.post<any>("https://localhost:7115/Delete",employeeAddRequest);
  }
 

}
