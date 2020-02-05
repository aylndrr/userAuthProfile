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
  exchangeResult: any;
  responseStatus: number;

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
    this.exchangeResult = this.exchangeService.loadXML(this.f.startDate.value);
    console.log(this.exchangeResult);
  }
}
