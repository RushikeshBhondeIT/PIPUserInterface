import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TwoFactorAuth } from 'src/app/Models/two-factor-auth';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';


@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.css']
})
export class TwoFactorAuthenticationComponent {
  tfaAuth: TwoFactorAuth = new TwoFactorAuth();
  status: string = "";
  message: string = "";
  code:string="";
  email:string="";
  constructor(private empService: AccountsControllerService, 
    private localStorage: LocalStorageService, 
    private route: Router,
    private serverInfo:ServerInformationService) {
  }
  
  


  TFAlogIn() {
    this.empService.TFAlogInApiCall(this.tfaAuth).subscribe(res => {
      if (res != null) {
        this.status = res.status;
        this.message = res.message;
        this.serverInfo.showSuccessMessage('Success',
        this.message,
        'success',
        false,)
      }
    },error =>{
      console.log(error.message);
      this.serverInfo.showSuccessMessage('Error',
      error.error.message,
      'error',
      false,)
    });
  }
}
