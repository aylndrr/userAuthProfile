import {Injectable} from '@angular/core';
import xml2js from 'xml2js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {map} from 'rxjs/operators';
import {Welcome} from '../models/currency.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExchangeService {
  public xmlItems: any;
  parser = new DOMParser();
  exchange: Welcome;
  now: Date = new Date();

  constructor(private http: HttpClient, private datePipe: DatePipe, private xml2JsonService: NgxXml2jsonService) {
  }

  private getDateStringWithFormat(date: Date, format: string): string {
    return this.datePipe.transform(date, format);
  }

  buildUrl(date: string): string {
    const newDate = new Date(date);
    const dateStr = this.getDateStringWithFormat(newDate, 'ddMMyyyy');
    const yearMonth = this.getDateStringWithFormat(newDate, 'yyyyMM');
    return `/kurlar/${yearMonth}/${dateStr}.xml`;
  }

  loadXML(date: string): Observable<Welcome> {
    const url = this.buildUrl(date);
    const headers = new HttpHeaders({'Content-Type': 'text/xml'}).set('Accept', 'text/xml');
    return this.http.get(url,
      {headers, responseType: 'text'})
      .pipe(
        map(result => {
          const xml = this.parser.parseFromString(result, 'text/xml');
          const obj = this.xml2JsonService.xmlToJson(xml);
          const data: Welcome = JSON.parse(JSON.stringify(obj));
          // console.log(data);
          return data;
        })
      );
  }
}
