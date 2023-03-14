import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GptHttpServiceService } from '../../services/gpt-http-service.service';
import { GptResponse } from '../../models/gptResponse';
import { GptService } from 'src/app/services/gpt/gpt.service';
import { AttackResp } from 'src/app/models/attackResp';
import { AlertController } from '@ionic/angular';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.page.html',
  styleUrls: ['./main-chat.page.scss'],
})
export class MainChatPage implements OnInit {
  chat_list: AttackResp[] = [];
  show_list: string[] = ['The game start!'];
  message!: String;
  constructor(
    private helpers: HelpersService,
    private alertController: AlertController,
    private gptHttpService: GptHttpServiceService,
    private gptService: GptService) { }

  ngOnInit() {
  }

  async sendMsg() {
    this.gptService.generateEvent().subscribe(
        r => {
          console.log(r.choices[0].text)
          let obj = JSON.parse(r.choices[0].text)
          let res: AttackResp = obj as AttackResp;
          console.log(res)
          this.chat_list.push(res)
          this.show_list.push(obj.event)

          console.warn(r.choices[0].text)
        }
      );
      console.log("delay start")
      await this.helpers.delay(10000);
      console.log("delay finish",this.chat_list.length)
      if (this.chat_list.length > 0) {
      const alert = await this.alertController.create({
        header: 'Attack',
        subHeader: 'You are under attack',
        message: `Attacker: ${this.chat_list[this.chat_list.length-1].atacker}!`,
        buttons: ['FIGHT', 'RUN'],
      });

      await alert.present();
    }
  }
}
