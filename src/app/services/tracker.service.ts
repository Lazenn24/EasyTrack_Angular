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

    url = decodeURI(url);
    console.log("en saveitem la url es " + url);
    
    const email = this.getUserEmail();
    this.fullUrl = this.proxy + url;
    this.http.get(this.fullUrl, {responseType: 'text'}).subscribe((res: any) => {
      this.html = res;
      this.html = this.html.substring(this.html.indexOf('<span id="' + priceTag + '"'), this.html.length);
      if(url.indexOf('?') !== -1){
        url = url.substring(0, url.indexOf('?'));
      }
      if(url.indexOf('ref') !== -1){
        url = url.substring(0, url.indexOf('ref')); 
      }
      console.log("despues de manipularla es " + url);
      
      let precio = this.html.match(this.regEx)[0];
      precio = precio.replace(',', '.');
      const customItem = {
        email: '' + email + '',
        name: '' + nombre + '',
        currentPrice: '' + precio + '' ,
        url: '' + url + ''
      };
      console.log(customItem);
      

      this.http.post('/items', customItem).subscribe(() => {
        this.getItemsOfUser(this.getUserName(), this.getUserEmail());
      });
    });
  }

  public getItemsOfUser(name: string, email: string) {
    const user = {
      name: '' + name + '',
      email: '' + email + ''
    };
    return this.http.post('/items/getItemsOfUser', user);
    }


  public saveUser(name: string, email: string) {
    const user = {
      name: '' + name + '',
      email: '' + email + ''
    };
    return this.http.post('/user', user);
  }

   public getPriceTag(url: string): Observable<WebModel> {
     url = decodeURI(url);
     console.log("en getPriceTag la url es " + url);
     
     return this.http.get<WebModel>('/items/priceTag?url='.concat(url));
  }

  public deleteItem(name: string) {
    return this.http.delete('/items?name='.concat(name));
  }

  public getPricesOfItem(url: string) {
    url = encodeURI(url);
    return this.http.get('/items/chart?url='.concat(url));
  }

  public getEveryUrl() {
    return this.http.get('/items/getUrls');
  }

  public getUserName() {
    let value = '; ' + document.cookie;
    let parts = value.split('; name=');
    if (parts.length == 2) { return parts.pop().split(";").shift(); }
    // const cookies = document.cookie.split(';');
    // const name = cookies[2].substring(cookies[2].indexOf('=') + 1, cookies[2].length );
    // return name;
  }

  public checkPrice(url: string) {
    url = decodeURI(url);
    this.getPriceTag(url).subscribe(data => {
      const priceTag = data.priceTag;
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
        this.http.put('/items', item);
      });
    });
}

  public getUserEmail() {
    let value = '; ' + document.cookie;
    let parts = value.split('; email=');
    if (parts.length == 2) { return parts.pop().split(";").shift(); }
    // const cookies = document.cookie.split(';');
    // const email = cookies[1].substring(cookies[1].indexOf('=') + 1, cookies[1].length );
    // return email;
  }
}
