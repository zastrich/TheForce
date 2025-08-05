import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { HandTracker, HandTrackerConfig } from '@theforce/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandTrackerService implements OnDestroy {
  private handTracker: HandTracker | null = null;
  private handLandmarksSubject = new BehaviorSubject<any[]>([]);
  private isTracking = false;

  constructor(private ngZone: NgZone) {}

  public get handLandmarks$(): Observable<any[]> {
    return this.handLandmarksSubject.asObservable();
  }

  public get tracking(): boolean {
    return this.isTracking;
  }

  public async initialize(config: HandTrackerConfig = {}): Promise<void> {
    this.handTracker = new HandTracker(config);
    
    this.handTracker.onResults((results) => {
      this.ngZone.run(() => {
        this.handLandmarksSubject.next(results.multiHandLandmarks || []);
      });
    });
  }

  public async start(config?: HandTrackerConfig): Promise<void> {
    if (this.isTracking) {
      return;
    }

    if (!this.handTracker) {
      await this.initialize(config);
    }
    
    if (this.handTracker) {
      await this.handTracker.start();
      this.isTracking = true;
    }
  }

  public async stop(): Promise<void> {
    if (!this.isTracking || !this.handTracker) {
      return;
    }

    await this.handTracker.stop();
    this.isTracking = false;
    this.handLandmarksSubject.next([]);
  }

  public async restart(config?: HandTrackerConfig): Promise<void> {
    await this.stop();
    await this.start(config);
  }

  public getTracker(): HandTracker | null {
    return this.handTracker;
  }

  ngOnDestroy(): void {
    if (this.handTracker) {
      this.handTracker.stop();
      this.handTracker = null;
    }
  }
}
