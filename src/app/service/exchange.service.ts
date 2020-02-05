import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExchangeService {

  constructor( private http: HttpClient) {
  }

  getExchange(currentDate: string) {
    const yyyy = currentDate.split('-')[0];
    const MM = currentDate.split('-')[1];
    const dd = currentDate.split('-')[2];
    return this.http.get(
      'kurlar/' + yyyy + MM + '/' + dd + MM + yyyy + '.xml',
      {responseType: 'text'}
    );
  }
}
