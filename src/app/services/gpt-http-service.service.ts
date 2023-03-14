import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GptResponse } from '../models/gptResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GptHttpServiceService {

  constructor(private http: HttpClient) { }

  getAnswer(msg: any): Observable<GptResponse> {
    let data = this.createBodyRequest(msg)
    console.log(data)
    return this.http.post<GptResponse>(`${environment.GPT_API}`, data, {headers:
      {'Content-Type':'application/json',
      'Authorization':`Bearer ${environment.OPENAI_API_KEY}`}
  });
  }

  createBodyRequest(msg: any): object {
    let data = {
      model:            "text-davinci-003",
		  prompt:           JSON.stringify(msg),
		  temperature:      0.7,
		  max_tokens:        2000,
		  top_p:             1,
		  frequency_penalty: 0,
		  presence_penalty:  0,
    }
    return data;
  }
}
