import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WebModel } from '../models/web.model';
import { ResolveEnd } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private http: HttpClient) { }


  private proxy = 'https://api.codetabs.com/v1/proxy?quest=';

  private fullUrl: string;

  private html: string;

    private headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

  private precio: any;

  private web: any;

  private priceTag: string;

  private regEx = new RegExp('[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?');

  public saveItem(url: string, nombre: string, priceTag: string) {

    let email = this.getUserEmail();
    this.fullUrl = this.proxy + url;
    this.http.get(this.fullUrl, {responseType: 'text'}).subscribe((res: any) => {
      this.html = res;
      this.html = this.html.substring(this.html.indexOf('<span id="' + priceTag + '"'), this.html.length);
      url = url.substring(0, url.indexOf('?'));
      url = url.substring(0, url.indexOf('ref'));

      let precio = this.html.match(this.regEx)[0];
      precio = precio.replace(',', '.');
      let customItem = {
        email: '' + email + '',
        name: '' + nombre + '',
        currentPrice: '' + precio + '' ,
        url: '' + url + ''
      }

      this.http.post('http://localhost:8080/items', customItem).subscribe(() =>{
        this.getItemsOfUser(this.getUserName(), this.getUserEmail());
      });
    });
  }

  public getItemsOfUser(name:string, email: string) {
    let user = {
      name: '' + name + '',
      email: '' + email + ''
    }
    return this.http.post('http://localhost:8080/items/getItemsOfUser', user);
    }

  
  public saveUser(name: string, email: string) {
    const user = {
      name: '' + name + '',
      email: '' + email + ''
    };
    return this.http.post('http://localhost:8080/user', user);
  }

   public getPriceTag(url: string): Observable<WebModel> {
      return this.http.get<WebModel>('http://localhost:8080/items/priceTag?url=' + url);
  }

  public deleteItem(name:string){
    return this.http.delete('http://localhost:8080/items?name=' + name);
  }

  public getPricesOfItem(url: string){
    return this.http.get('http://localhost:8080/items/chart?url=' + url);
  }

  public getEveryUrl(){
    return this.http.get('http://localhost:8080/items/getUrls');
  }

  public getUserName() {
    const cookies = document.cookie.split(';');
    const name = cookies[2].substring(cookies[2].indexOf('=') + 1, cookies[2].length );
    return name;
  }

  public checkPrice(url: string){
    this.getPriceTag(url).subscribe(data =>{
      let priceTag = data.priceTag;
      this.fullUrl = this.proxy + url;
      return this.http.get(this.fullUrl, {responseType: 'text'}).subscribe((res: any) => {
        this.html = res;
        this.html = this.html.substring(this.html.indexOf('<span id="' + priceTag + '"'), this.html.length);
        url = url.substring(0, url.indexOf('?'));
        url = url.substring(0, url.indexOf('ref'));
        let precio =  this.html.match(this.regEx)[0];
        precio = precio.replace(',', '.');
        const item = {
          url: '' + url + '',
          currentPrice: '' + precio + ''
        };
        this.http.put('http://localhost:8080/items', item);
      });
    });
}

  public getUserEmail() {
    const cookies = document.cookie.split(';');
    const email = cookies[1].substring(cookies[1].indexOf('=') + 1, cookies[1].length );
    return email;
  }
}
