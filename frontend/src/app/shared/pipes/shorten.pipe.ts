import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number) {

    const shortenAmount = limit || 10;

    if (value.length > shortenAmount) {
      return value.substr(0, shortenAmount) + '...';
    }

    return value;
  }
}
