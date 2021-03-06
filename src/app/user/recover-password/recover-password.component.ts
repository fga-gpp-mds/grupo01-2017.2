import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService, AlertService } from '../../services/index';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})

export class RecoverPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  recoverPassword() {
    const emailInput = (this.form.get('email') as any)._value;
    const defaultMsg = 'Se o e-mail digitado estiver ativo, '
    + 'você receberá um e-mail em breve com a nova senha!';

    this.userService.sendNewPassword(emailInput).subscribe((result) => {
      this.form.reset();
      this.alertService.success(defaultMsg);
    },
    (error) => {
      this.form.reset();
      this.alertService.success(defaultMsg);
    });
  }
}
