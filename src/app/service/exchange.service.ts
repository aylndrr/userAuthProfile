import {Injectable} from '@angular/core';
import xml2js from 'xml2js';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExchangeService {
  public xmlItems: any;

  constructor(private http: HttpClient) {
    // const headers = new HttpHeaders({'Content-Type': 'text/xml'}).set('Accept', 'text/xml');
  }

  getExchange(startDate: string) {
    const yyyy = startDate.split('-')[0];
    const MM = startDate.split('-')[1];
    const dd = startDate.split('-')[2];
    return this.http.get(
      'kurlar/' + yyyy + MM + '/' + dd + MM + yyyy + '.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          // tslint:disable-next-line:max-line-length
          .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'),
        responseType: 'text'
      });
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
