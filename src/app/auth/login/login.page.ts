import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { HashingPasswordService } from 'src/app/services/hashing-password.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  user!: any;
  private routeSub!: Subscription;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private hashService: HashingPasswordService) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
   }

  ngOnInit() {
  }

  async login(){
    console.log("start login method: ", this.loginForm.value.email, this.loginForm.value.password)
    if (this.loginForm.value.email != "" && this.loginForm.value.password != "") {
      console.log(this.loginForm.get('email')!.value)
    this.userService.getCurrentUser(this.loginForm.value.email).subscribe((mapDocs) => {
      console.warn(mapDocs)
      this.user = mapDocs;
      });
      this.user = await this.userService.fetchUser();
      console.log("-----------")
    }
    await this.delay(1000)
    console.log("Heshed password: ", this.user[0]['hashed_password'])
    let res = this.hashService.checkPasssword(this.loginForm.value.password, this.user[0]['hashed_password']);
    if (res == true) {
      localStorage.setItem('user_email', this.user[0]['email'])

      console.log("Password seted up")
      this.router.navigate(['/folder/map'])
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
