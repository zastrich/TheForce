import { Component, OnInit, OnDestroy } from "@angular/core";
import { HandTrackerService } from "@theforce/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  isTracking = false;
  handLandmarks: any[] = [];

  constructor(private handTrackerService: HandTrackerService) {}

  ngOnInit() {
    this.handTrackerService.initialize({
      hoverDelay: 1000,
      sensitivityX: 1.5,
      sensitivityY: 1.5,
      debug: true,
    });
    this.handTrackerService.handLandmarks$.subscribe((landmarks) => {
      this.handLandmarks = landmarks;
    });
  }

  ngOnDestroy() {
    this.handTrackerService.stop();
  }

  async startTracking() {
    await this.handTrackerService.start();
    this.isTracking = true;
  }

  async stopTracking() {
    await this.handTrackerService.stop();
    this.isTracking = false;
  }

  handleClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.classList.add("clicked");
    setTimeout(() => {
      element.classList.remove("clicked");
    }, 3000);
  }
}
