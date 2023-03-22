import { Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: 'button[appClickWithWarning]'
})
export class ClickWithWarningDirective implements OnInit {
  @HostBinding('class') class: string | undefined;
  @Input() warningMessage = 'Are you really sure?';
  @Output() appClickWithWarning = new EventEmitter();

  // constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.elementRef.nativeElement.setAttribute('class', 'btn btn-danger');
    this.class = 'btn btn-danger';
  }

  @HostListener('click', ['$event.shiftKey'])
  handleClick(shiftKey: boolean): void {
    if (shiftKey || confirm(this.warningMessage)) {
      this.appClickWithWarning.emit();
    }
  }
}
