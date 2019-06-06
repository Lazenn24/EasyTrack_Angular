import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private http: HttpClient) { }

  private proxy = 'https://cors-anywhere.herokuapp.com/';

  private template = 'https://www.amazon.es/Travis-Touch-Traductor-Inteligente-Inal%C3%A1mbrica/dp/B07HB1RYG7';

  private url: string;

  private html: string;

  private precio = '199,90';

  private regEx = new RegExp('[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?');
  getPrice(){

    this. url = this.proxy + this.template;
    console.log(this.url);
    this.http.get(this.url, {responseType: 'text'}).subscribe((res: any) => {
      this.html = res;
      this.html = this.html.substring(this.html.indexOf('"priceblock_ourprice"'), this.html.length);
      this.html = this.html.substring(this.html.indexOf('>') + 1, this.html.indexOf('<'));
      this.precio = this.html.match(this.regEx)[0];
      console.log(this.precio);
      
      
      

    });
  }
}
