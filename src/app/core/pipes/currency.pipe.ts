import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'BRL', display: string = 'symbol', digitsInfo: string = '1.2-2'): string | null {
    if (value == null) return null;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

}
