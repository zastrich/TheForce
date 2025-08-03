import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HandTrackerService } from '@theforce/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  
  isTracking = false;
  handLandmarks: any[] = [];
  stream: MediaStream | null = null;

  constructor(private handTrackerService: HandTrackerService) {}

  ngOnInit() {
    this.initializeCamera();
    this.handTrackerService.handLandmarks$.subscribe(landmarks => {
      this.handLandmarks = landmarks;
    });
  }

  ngOnDestroy() {
    this.cleanup();
  }

  async initializeCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      this.videoElement.nativeElement.srcObject = this.stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }

  async startTracking() {
    if (this.videoElement.nativeElement && this.stream) {
      await this.handTrackerService.start(this.videoElement.nativeElement, {
        hoverDelay: 2000,
        sensitivityX: 1.5,
        sensitivityY: 1.5,
      });
      this.isTracking = true;
    }
  }

  async stopTracking() {
    await this.handTrackerService.stop();
    this.isTracking = false;
  }

  handleClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.classList.add('clicked');
    setTimeout(() => {
      element.classList.remove('clicked');
    }, 2000);
  }

  private cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }
} 