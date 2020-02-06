export interface Welcome {
  Tarih_Date: TarihDate;
}

export interface TarihDate {
  '-Tarih': string;
  '-Date': string;
  '-Bulten_No': string;
  Currency: Currency[];
}

export interface Currency {
  '-CrossOrder': string;
  '-Kod': string;
  '-CurrencyCode': string;
  Unit: string;
  Isim: string;
  CurrencyName: string;
  ForexBuying: string;
  ForexSelling?: string;
  BanknoteBuying?: string;
  BanknoteSelling?: string;
  CrossRateUSD?: string;
  CrossRateOther?: string;
}

