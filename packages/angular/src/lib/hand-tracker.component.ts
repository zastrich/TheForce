import { Component, Input, ElementRef, OnInit } from '@angular/core';
import type { HandTrackerConfig } from '@theforce/core';
import { HandTrackerService } from './hand-tracker.service';

@Component({
  selector: 'force-hand-tracker',
  template: `
    <video #video style="display: none;"></video>
    <ng-content></ng-content>
  `
})
export class HandTrackerComponent implements OnInit {
  @Input() options: HandTrackerConfig = {};

  constructor(
    private handTrackerService: HandTrackerService,
    private elementRef: ElementRef
  ) {}

  async ngOnInit(): Promise<void> {
    const videoElement = this.elementRef.nativeElement.querySelector('video');
    await this.handTrackerService.initialize({
      ...this.options,
      videoElement
    });
  }
} 