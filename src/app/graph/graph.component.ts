import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExchangeService} from '../service/exchange.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [ExchangeService]
})
export class GraphComponent implements OnInit {
  exchangeForm: FormGroup;
  data: boolean = true;
  exchangeResult: any;

  constructor(private formBuilder: FormBuilder, private exchangeService: ExchangeService, private http: HttpClient) {
  }

  ngOnInit() {
    this.exchangeForm = this.formBuilder.group({
      startDate: ['', Validators.required]
    });
  }

  get f() {
    return this.exchangeForm.controls;
  }

  showExchange(): void {
    console.log(this.exchangeForm.value);
    this.exchangeService.getExchange(this.f.startDate.value).subscribe(x => {
      this.exchangeService.parseXML(x)
        .then((data) => {
          this.exchangeService.xmlItems = data;
        });
      this.exchangeResult = x;
      console.log('sonuc :', this.exchangeResult);
    });
  }
}
