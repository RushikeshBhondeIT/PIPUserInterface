import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EmployeeResponse } from 'src/app/Models/employee-response';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { EmployeeSharedService } from 'src/app/SharedServices/employee-shared.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Employees: EmployeeResponse[]=[];
  message: string = ""
  status: string = ""
  // employeeObject: EmployeeResponse = new EmployeeResponse();
  // dtoptions: DataTables.Settings = {}
  // dtTrigger: Subject<any> = new Subject()
  constructor(private empService: EmployeeServiceService, private localStorage: LocalStorageService, private router: Router,
    private employeeSharedService:EmployeeSharedService
    ) {
  }
  ngOnInit() {
    this.GetAllEmployee();
  }

  GetAllEmployee() {
    if (this.localStorage.isLoggedIn() == false) {
      this.empService.GetAllEmployeeApiCall().subscribe(res => {
        if (res != null || res.status == "Success") {
          this.Employees = res
          this.status = res.status;
          this.message = res.message;
          //this.dtTrigger.next(null);
        }
      });
      //alert("GetAll employee excecuted");
    }
  }
  CreateEmployee(){
    this.router.navigateByUrl('/create-employee')
  }
  Editinvoice(employee: EmployeeResponse) {
    //this.SaveData(employee);
   this.router.navigate(['/edit-employee'],{queryParams:{employeeId:employee.employeeId,employeeName:employee.employeeName,email:employee.email,countryName:employee.countryName,countryId:employee.countryId,address:employee.address,receiveNewsLetters:employee.receiveNewsLetters,gender:employee.gender,dateOfBirth:employee.dateOfBirth,age:employee.age}}); //Query string with navigate to send ProductId
   
   // this.employeeSharedService.setEmployeeResponce(employee);
    //  this.route.navigateByUrl('/edit-employee');
  }
  // SaveData(employee: EmployeeResponse){
    
  //   //this.localStorage.setItem("employee",employee.EmployeeName);
  // }

  
}
