import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExchangeService} from '../service/exchange.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [ExchangeService]
})
export class GraphComponent implements OnInit {
  exchangeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private exchangeService: ExchangeService) {
  }

  exchangeResult: any;

  ngOnInit() {
    this.exchangeForm = this.formBuilder.group({
      selectedDate: ['', Validators.required]
    });
  }

  get f() {
    return this.exchangeForm.controls;
  }

  showExchange(): void {
    console.log(this.exchangeForm.value);
    this.exchangeService.getExchange(this.f.selectedDate.value).subscribe(x => {
      this.exchangeResult = x;
      console.log('sonuc :' , this.exchangeResult);
    });
  }
}
