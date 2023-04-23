"use strict";

export default class Pour {
  constructor(meterIdentity) {
    this.meterIdentity = meterIdentity;
    this.startTimestamp = Date.now();
    this.endTimestamp = null;
    this.totalVolume = null;
  }

  endPourWithTimestampAndVolume = (endTimestamp, totalVolume) => {
    this.endTimestamp = endTimestamp;
    this.totalVolume = totalVolume;
  };

  getMeterIdentity = () => this.meterIdentity;
  getPourVolume = () => this.totalVolume;
  toJSON = () => ({
    meterIdentity: this.meterIdentity,
    startTimestamp: this.startTimestamp,
    endTimstamp: this.endTimestamp,
    totalVolume: this.totalVolume,
  });
}
