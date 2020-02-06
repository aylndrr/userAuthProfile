export interface Welcome {
  'xml-stylesheet': XMLStylesheet;
  Tarih_Date: TarihDate;
}

export interface TarihDate {
  '@attributes': TarihDateAttributes;
  '#text': TarihDateText[];
  Currency: Currency[];
}

export enum TarihDateText {
  Empty = '\n\t',
  Text = '\n',
}

export interface TarihDateAttributes {
  Tarih: string;
  Date: string;
  Bulten_No: string;
}

export interface Currency {
  '@attributes': CurrencyAttributes;
  '#text': CurrencyText[];
  Unit: string;
  Isim: string;
  CurrencyName: string;
  ForexBuying: string;
  ForexSelling: XMLStylesheet | string;
  BanknoteBuying: XMLStylesheet | string;
  BanknoteSelling: XMLStylesheet | string;
  CrossRateUSD: XMLStylesheet | string;
  CrossRateOther: XMLStylesheet | string;
}

export enum CurrencyText {
  Empty = '\n\t\t\t',
  Fluffy = '\n\t\t',
  Purple = '\n\t\t\t\t',
  Tentacled = '\n\t',
  Text = '\n\t\t\n\t',
}

export interface CurrencyAttributes {
  CrossOrder: string;
  Kod: string;
  CurrencyCode: string;
}

// tslint:disable-next-line:no-empty-interface
export interface XMLStylesheet {
}
