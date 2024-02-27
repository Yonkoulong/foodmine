import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appWhellAction]',
  standalone: true
})
export class WhellActionDirective {
  
  constructor(private el: ElementRef) {}
}
