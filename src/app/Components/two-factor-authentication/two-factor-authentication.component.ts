import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TwoFactorAuth } from 'src/app/Models/two-factor-auth';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import Swal from 'sweetalert2';

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
  constructor(private empService: AccountsControllerService, private localStorage: LocalStorageService, private route: Router) {
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


  TFAlogIn() {
    alert("Login event clicked");
    this.empService.TFAlogInApiCall(this.tfaAuth).subscribe(res => {
      if (res != null) {
        this.status = res.status;
        this.message = res.message;
        this.showSuccessMessage('SweetAlert Success',
        this.message,
        'success',
        true,)
      }
    });
  }
}
