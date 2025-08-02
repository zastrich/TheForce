import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[forceHoverable]'
})
export class HoverableDirective {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add('force-hoverable');
  }
} 