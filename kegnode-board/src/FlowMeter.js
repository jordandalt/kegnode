'use strict'

const ACTIVE = 1;
const IDLE = 0;

export default class FlowMeter {
  constructor(meterIdentity, tapIdentity, ticksToVolume) {
    this.identity = meterIdentity;
    this.tapIdentity = tapIdentity;
    this.ticksToVolume = ticksToVolume;
    this.currentTickCount = 0;
    this.lastTickTimestamp = null;
    this.status = IDLE;
  }

  addTick = () => {
    // toggle flowmeter to active, iterate tick count, update last timestamp
    this.status = ACTIVE;
    this.currentTickCount++;
    this.lastTickTimestamp = Date.now();
  }
  makeIdle = () => {
    this.status = IDLE;
    this.currentTickCount = 0;
  }

  getCurrentFlowVolume = () => {
    return this.currentTickCount * this.ticksToVolume;
  }
  getIdentity = () => this.identity;
  getLastTickTimestamp = () => this.lastTickTimestamp;
  toJSON = () => ({
    meterIdentity: this.identity,
    tapIdentity: this.tapIdentity,
    currentVolume: this.getCurrentFlowVolume(),
    lastTickTimestamp: this.lastTickTimestamp,
    status: this.status,
  });
}