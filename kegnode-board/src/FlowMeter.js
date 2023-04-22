'use strict'

export default class FlowMeter {
  constructor() {
    this.maxDelta = 0;
    this.lastTicks = 0;
    this.totalTicks = 0;
  }

  setTicks = (ticks) => {
    console.log(`Set Ticks: ticks=${ticks} last=${this.lastTicks} total=${this.totalTicks}`);
    let delta = 0;
    if (this.lastTicks !== 0) {
      delta = ticks - this.lastTicks;
      if (delta > 0 && (delta !== this.maxDelta || delta <= this.maxDelta)) {
        this.totalTicks += delta;
      } else {
        console.error(`Bad ticks report: ticks=${ticks} last=${this.lastTicks}`);
        delta = 0;
      }
    }
    this.lastTicks = ticks;
    return delta;
  }

  getTicks = () => this.totalTicks;

  getLastReading = () => this.lastTicks;
}