import { Injectable } from '@angular/core';
import * as bcrypt from "bcryptjs";

@Injectable({
  providedIn: 'root'
})
export class HashingPasswordService {
  salt = bcrypt.genSaltSync(10);
  encodedPass;
  timestamp;
  key;
  rawString = "oad106";
  constructor() {
    this.timestamp = Date.now();
    this.key = this.salt + this.timestamp;
    this.encodedPass = bcrypt.hashSync(this.rawString, this.key);

    console.log("Salted Pass:", this.encodedPass);
    console.log(
      "Compare passwords: ",
      bcrypt.compareSync(this.rawString, this.encodedPass),
    );
   }

   hashPassword(pass: string): String {
    let timestamp = Date.now();
    let key = this.salt + this.timestamp;
    return bcrypt.hashSync(pass, key);
   }
   checkPasssword(password: string, hashedPassword: string): Boolean {
    return bcrypt.compareSync(password, hashedPassword);
   }
}
