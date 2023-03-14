import { Injectable } from '@angular/core';
import { GptHttpServiceService } from '../gpt-http-service.service';
import { HelpersService } from '../helpers.service';
import { MapServiceService } from '../map-service.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class GptService {
maps: any;
user: any;
email!: string;
events: string[] = ['start of attack on the player', 'Meeting with one of the inhabitants of the area', 'finding something interesting or value'];
struct: string[] = ['{"event": "...", "atacker":"...", "atacker_strength":"...", "atacker_defense":"..."}',
'{"event": "..."}', '{"event": "...","item_name": "...", "item_describtion": "..."}'
]
constructor(
    private gptHttp: GptHttpServiceService,
    private mapService: MapServiceService,
    private helpers: HelpersService,
    private userService: UserService
    ) {
      this.mapService.getCurrentMaps().subscribe((mapDocs) => {
        this.maps = mapDocs;
      });
      this.mapService.fetchMaps();

      let res = localStorage.getItem('user_email')
      if (res != null) {
      this.email = res;
      this.userService.getCurrentUser(this.email).subscribe((mapDocs) => {
      this.user = mapDocs;
    });
    this.userService.fetchUser();
    }
  }

  generateEvent() {
    let x = this.helpers.randomNum(0, 2);
    let event = this.events[0]
    let struct = this.struct[0]
    let currentMap = this.helpers.currentMap(this.maps, this.user);
    console.log(currentMap)
    let object = {
      context: currentMap,
      player: this.user[0],
      task: `Create an event and colorfully and dramaticly describe it using context and player information. Event type: ${event}. Return the result in the json! format: ${struct}`
    }
    return this.gptHttp.getAnswer(object)
  }
}
