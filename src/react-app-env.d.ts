interface Symbol {
  description: string;
  code: string;
}

interface Currency {
  fromCurrency: string;
  toCurrency: string;
  conversionRate: number;
}
