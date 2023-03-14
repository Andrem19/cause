import { Injectable } from '@angular/core';
import { Map } from '../models/map';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  currentMap(maps: any, user: any): any {
    let m = <Map[]> maps;
    console.log(maps)
    for (let i = 0; i < maps.length; i++) {
      if (maps[i]['Coordinates'][0] == user[0]['Coordinates'][0]
      && maps[i]['Coordinates'][1] == user[0]['Coordinates'][1]) {
        return maps[i];
      }
    }
  }
  randomNum(min: number, max: number) {
    let x = Math.floor((Math.random() * max) + min);
    return x;
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
