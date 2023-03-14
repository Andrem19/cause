import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HashingPasswordService } from 'src/app/services/hashing-password.service';
import { UserService } from 'src/app/services/user.service';
import { FolderPage } from '../folder.page';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.page.html',
  styleUrls: ['./player-info.page.scss'],
})
export class PlayerInfoPage implements OnInit {
  user!: any;
  email!: string;
  private routeSub!: Subscription;
  constructor(private hashPassService: HashingPasswordService, private userService: UserService) { }

  ngOnInit() {
    let res = localStorage.getItem('user_email')
    if (res != null) {
      this.email = res;
    this.userService.getCurrentUser(this.email).subscribe((mapDocs) => {
      console.warn(mapDocs)
      this.user = mapDocs;
    });
    this.userService.fetchUser();
  }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
