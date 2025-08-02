import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandTrackerService } from './hand-tracker.service';
import { HandTrackerComponent } from './hand-tracker.component';
import { HoverableDirective } from './hoverable.directive';

@NgModule({
  declarations: [
    HandTrackerComponent,
    HoverableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HandTrackerComponent,
    HoverableDirective
  ],
  providers: [
    HandTrackerService
  ]
})
export class HandTrackerModule {}
