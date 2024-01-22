import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[onlyInputNumber]',
})
export class OnlyInputNumber {

  constructor(private el: ElementRef) {}
  
  @HostListener('keydown', ['$event']) 
  onKeyDown(event:any) {    
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8) { 
      return;
    }
    
    event.preventDefault();
  }

  @HostListener('input', ['$event']) 
  onInput(event:any) {    
    const value = this.el.nativeElement.value;
    
    if(event.data && (value.length == 3 || value.length == 6)) {
      const valSlice = value.slice(0, value.length - 1);
      this.el.nativeElement.value = valSlice + "/" + event.data;
    }

    if (value.length > 10) { 
      const valResult = value.slice(0, 10);
      this.el.nativeElement.value = valResult;
    } 
  }
}