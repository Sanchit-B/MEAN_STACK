import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
// example of custom attribute directive
@Directive({
  selector: '[appHighlightTextDirective]'
})
export class HighlightTextDirective implements OnInit{
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
  }
}
