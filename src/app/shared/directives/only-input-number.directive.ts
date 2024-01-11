import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[onlyInputNumber]',
})
export class OnlyInputNumber {
  constructor(private el: ElementRef) {

  }

  @HostListener('keydown', ['$event']) 
  onKeyDown(event:any) {    
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8) { 
      return;
    }
    
    event.preventDefault();
  }

  // @HostListener('input', ['$event']) 
  // onInput(event:any) {    
  //   if (this.el.nativeElement.value.length > 8) { 
      
  //     return;
  //   } 
  // }


}