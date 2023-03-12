import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GptHttpServiceService } from './gpt-http-service.service';
import { GptServiceService } from './gpt-service.service';
import { GptResponse } from './gptResponse';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.page.html',
  styleUrls: ['./main-chat.page.scss'],
})
export class MainChatPage implements OnInit {
  chat_list: String[] = ['The game start!'];
  message!: String;
  constructor(private gptHttpService: GptHttpServiceService) { }

  ngOnInit() {
  }

  async sendMsg() {
    console.log(this.message)
    this.chat_list.push(this.message);
    await this.gptHttpService.getAnswer(this.message).subscribe(
      r => {
        this.chat_list.push(r.choices[0].text);
      }
    );
    this.message = '';
  }
}
