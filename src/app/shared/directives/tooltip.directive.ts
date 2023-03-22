import { Directive, ElementRef, EmbeddedViewRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'input[appTooltip]'
})
export class TooltipDirective implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('appTooltip') template!: TemplateRef<unknown>;

  @HostListener('mouseover')
  handleMouseover() {
    this.setHidden(false);
  }

  @HostListener('mouseout', ['$event.shiftKey'])
  handleMouseout(shiftKey: boolean) {
    if (!shiftKey) {
      this.setHidden(true);
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private viewRef: EmbeddedViewRef<unknown> | undefined;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    if (!this.template) {
      return;
    }

    this.viewRef = this.viewContainer.createEmbeddedView(this.template, {
      $implicit: 'Unser super Tooltip',
      helpText: 'Das ist ein Hilfetext!',
      helpLink: 'https://www.google.ch',
      helpLinkLabel: 'Link'
    });

    this.setHidden(true);
  }

  private setHidden(hide: boolean) {
    this.viewRef?.rootNodes.forEach((node) => (node.hidden = hide));
  }
}
