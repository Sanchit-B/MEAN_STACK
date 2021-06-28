import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
// example of custom structural directive
@Directive({
  selector: '[appShowHideDirective]'
})
export class ShowHideDirective implements OnInit{

  @Input() appShowHideDirective: boolean;

  constructor(private tempRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}

  ngOnInit() {
    if(this.appShowHideDirective) {
      this.vcRef.createEmbeddedView(this.tempRef);
    } else {
      this.vcRef.clear()
    }
  }
}
