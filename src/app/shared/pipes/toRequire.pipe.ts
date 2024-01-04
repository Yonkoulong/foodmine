import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'toRequire'
})

export class ToRequriePipe implements PipeTransform {
  transform(value: string | number): string {
    return `${value} to require`;
  }
}