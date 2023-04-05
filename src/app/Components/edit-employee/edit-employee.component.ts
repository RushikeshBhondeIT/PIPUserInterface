import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeResponse } from 'src/app/Models/employee-response';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';
import { EmployeeSharedService } from 'src/app/SharedServices/employee-shared.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  message: string = "";
  status: string = "";
  selectedTeam: string ;
  employeeObject: EmployeeResponse = new EmployeeResponse();
  newsLetter: string;
  tex: string = "Testing data";

  constructor(private route: ActivatedRoute,
     public employeeSharedService: EmployeeSharedService,
      private empService: EmployeeServiceService,
       private router: Router,
       private serverInfo:ServerInformationService) {
        console.log(this.route);
  }

  ngOnInit() {
    this.employeeObject.employeeId = this.route.snapshot.queryParamMap.get("employeeId"); //Read Query String value
    this.employeeObject.employeeName = this.route.snapshot.queryParamMap.get("employeeName");
    this.employeeObject.gender = this.route.snapshot.queryParamMap.get("gender");
    this.employeeObject.countryName = this.route.snapshot.queryParamMap.get("countryName");
    this.employeeObject.receiveNewsLetters = JSON.parse(this.route.snapshot.queryParamMap.get("receiveNewsLetters"));
    this.employeeObject.dateOfBirth = new Date(this.route.snapshot.queryParamMap.get("dateOfBirth"));
    this.employeeObject.countryId = this.route.snapshot.queryParamMap.get("countryId");
    this.employeeObject.email = this.route.snapshot.queryParamMap.get("email");
    this.employeeObject.age = this.route.snapshot.queryParamMap.get("age");
    this.employeeObject.address = this.route.snapshot.queryParamMap.get("address");
  }


  convertToBoolean(value:string) {
    const booleanTrue: boolean = JSON.parse(value)  // Returns true
    const booleanFalse: boolean = JSON.parse(value)
  }
  onSelected(values: string): void {
    this.selectedTeam=values;
    alert("GENDER SELECTION :" +this.selectedTeam)
    this.employeeObject.gender = this.selectedTeam;
  }

  NewsLetterSelected(value: string): void {
    this.newsLetter = value;
    alert(( this.newsLetter));
    this.employeeObject.receiveNewsLetters =JSON.parse( this.newsLetter);
  }

  EditUserfunction() {
    this.empService.EditEmployeeApiCall(this.employeeObject).subscribe(res => {
     
      if (res != null) {
        this.employeeObject = res;
        this.serverInfo.showSuccessMessage('Edited Successfully!',
          this.message,
          'success',
          true,)
        this.router.navigateByUrl('/dashboard')
      }
    },e =>{
      this.serverInfo.showErrorMessage('Error',
      e.error.message,
      'error',
      true,)
      this.router.navigateByUrl('/dashboard');
    });
  }
}

