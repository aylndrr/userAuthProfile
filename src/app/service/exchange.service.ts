import {Injectable} from '@angular/core';
import xml2js from 'xml2js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {map} from 'rxjs/operators';
import {Welcome} from '../models/currency.model';

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
    console.log('date : ', date);
    console.log('format : ', format);
    return this.datePipe.transform(date, format);
  }

  buildUrl(date: string): string {
    const newDate = new Date(date);
    const dateStr = this.getDateStringWithFormat(newDate, 'ddMMyyyy');
    const yearMonth = this.getDateStringWithFormat(newDate, 'yyyyMM');
    return `/kurlar/${yearMonth}/${dateStr}.xml`;
  }

  loadXML(date: string): Welcome {
    const url = this.buildUrl(date);
    const headers = new HttpHeaders({'Content-Type': 'text/xml'}).set('Accept', 'text/xml');
    this.http.get(url,
      {headers, responseType: 'text'})
      .pipe(
        map(result => {
          const xml = this.parser.parseFromString(result, 'text/xml');
          const obj = this.xml2JsonService.xmlToJson(xml);
          const data: Welcome = JSON.parse(JSON.stringify(obj));
          return data;
        })
      ).subscribe(result => {
      this.exchange = JSON.parse(JSON.stringify(result));
      this.exchange.Tarih_Date.Currency = this.exchange.Tarih_Date.Currency.filter(f => f['@attributes'].Kod !== 'XDR')
      // console.log(JSON.stringify(result));
      console.log(this.exchange.Tarih_Date.Currency);
    });
    return this.exchange;
  }

  parseXML(data) {
    return new Promise(resolve => {
      // tslint:disable-next-line:one-variable-per-declaration
      let k: string | number,
        // tslint:disable-next-line:prefer-const
        arr = [],
        // tslint:disable-next-line:prefer-const
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      // tslint:disable-next-line:only-arrow-functions
      parser.parseString(data, function(err, result) {
        const obj = result.Tarih_Date;
        // tslint:disable-next-line:forin
        for (k in obj.Currency) {
          const item = obj.Currency[k];
          arr.push({
            Unit: item.Unit[0],
            Isim: item.Isim[0],
            CurrencyName: item.CurrencyName[0],
            ForexBuying: item.ForexBuying[0],
            ForexSelling: item.ForexSelling[0],
            BanknoteBuying: item.BanknoteBuying[0],
            BanknoteSelling: item.BanknoteSelling[0],
            CrossRateUSD: item.CrossRateUSD[0],
            CrossRateOther: item.CrossRateOther[0]
          });
        }
        resolve(arr);
      });
    });
  }
}
