import { Component, OnInit, Input, TemplateRef, ViewContainerRef, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { WySearchPanelComponent } from './wy-search-panel/wy-search-panel.component';

@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit, AfterViewInit {
  @Input() handlerView: TemplateRef<any>;
  @Input() connectedTo: ElementRef;

  private overlayRef: OverlayRef;

  private panelPortal: ComponentPortal<WySearchPanelComponent>;

  @ViewChild('search', { static: false }) private defaultRef: ElementRef;


  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }



  ngAfterViewInit(): void {
    const strategy = this.overlay.position()
    .flexibleConnectedTo(this.connectedTo || this.defaultRef)
    .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: 0,
        offsetY: 0
    }]);
    // strategy.withLockedPosition(true);
    const config = new OverlayConfig({positionStrategy: strategy});
    config.scrollStrategy = this.overlay.scrollStrategies.reposition(); // 更随滑动的策略
    this.overlayRef = this.overlay.create(config);
    this.panelPortal = new ComponentPortal(WySearchPanelComponent, this.viewContainerRef);
    const c = new this.panelPortal.component();
    // console.log('c :', c);
    c.test = 'myTest';
    console.log('test :', c.test);
    c.out.subscribe((res) => {
      console.log('res :', res);
    });
  }

  onFocus() {
    console.log('onFocus');
    this.showOverlayPanel();
  }
  onBlur() {
    console.log('onBlur');
    // this.dismissOverlayPanel();
  }


  showOverlayPanel() {
   

    this.overlayRef.attach(this.panelPortal);
  }

  dismissOverlayPanel() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
  }

}