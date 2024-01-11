import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'toRequired'
})

export class ToRequiredPipe implements PipeTransform {
  transform(field: string | number): string {
    return `${field} is not empty`;
  }
}