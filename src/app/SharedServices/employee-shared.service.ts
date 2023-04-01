import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { EmployeeResponse } from '../Models/employee-response';


@Injectable({
  providedIn: 'root'
})
export class EmployeeSharedService {
//employeeResponce:EmployeeResponse = new EmployeeResponse();

  constructor() { }

  public employeeResponce : Subject<any> = new Subject<any>;
  getEmployeeResponce = this.employeeResponce.asObservable();

   public setEmployeeResponce(empResponce:EmployeeResponse):void {
    //alert("service" + empResponce.employeeName);
    this.employeeResponce.next(empResponce);
   }
  


}
