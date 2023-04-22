'use strict'

export default class Pour {
  constructor(tapIdentity) {
    this.tapIdentity = tapIdentity;
    this.startTimestamp = now();
    this.endTimestamp = null;
    this.totalVolume = null;
  }

  endPourWithTimestampAndVolume = (endTimestamp, totalVolume) => {
    this.endTimestamp = endTimestamp;
    this.totalVolume = totalVolume;
  }

  getTapIdentity = () => this.tapIdentity;
  toJSON = () => ({
    tapIdentity: this.tapIdentity,
    startTimestamp: this.startTimestamp,
    endTimstamp: this.endTimestamp,
    totalVolume: this.totalVolume,
  });
}