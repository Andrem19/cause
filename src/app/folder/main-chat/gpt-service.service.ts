import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const OpenAI = require('openai-api');

@Injectable({
  providedIn: 'root'
})
export class GptServiceService {
  openai: any;
  constructor() {
  this.openai = new OpenAI(environment.OPENAI_API_KEY);
  }

   async getAnswer(msg: String): Promise<String> {
    const gptResponse = await this.openai.complete({
        engine: 'text-davinci-003',
        prompt: msg,
        maxTokens: 2000,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        // stop: ['\n', "testing"]
    });

    console.log(gptResponse.data);
    return gptResponse.data.choices[0].text;
}
}
