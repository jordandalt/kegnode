import rpio from "rpio";
import axios from "axios";

import FlowMeter from "./src/FlowMeter.js";
import Pour from "./src/Pour.js";
import {
  FLOW_METER_TO_TAP_MAPPING,
  FLOW_METER_TO_CHANNEL_MAPPING,
  TICKS_TO_ML,
  MS_TO_IDLE,
  MINIMUM_VOLUME,
} from "./src/constants.js";

const flowMeterObjects = {};
const activePours = [];
const completedPours = [];
const lastMeters = {};
const meters = {};

const pushCompletePourToTap = async (completedPour) => {
  const tapIdentity =
    FLOW_METER_TO_TAP_MAPPING[completedPour.getMeterIdentity()];
  const pourBody = JSON.stringify(completedPour.toJSON());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/taps/${tapIdentity}/pour`,
      pourBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
      console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

const logPour = async (currentMeter) => {
  // get monitor's last tick timestamp
  const lastTickTimestamp = currentMeter.getLastTickTimestamp();

  // find activePour or create new pour
  const activePourIndex = activePours.findIndex(
    (pour) => pour.getMeterIdentity() === currentMeter.getIdentity()
  );
  if (activePourIndex < 0) {
    console.log(`KNB: ${currentMeter.getIdentity()} Starting Pour`);
  }
  let activePour =
    activePourIndex < 0
      ? new Pour(currentMeter.getIdentity())
      : activePours.splice(activePourIndex, 1)[0];

  const currentTimestamp = Date.now();

  const closeLastPour =
    currentTimestamp - lastTickTimestamp > MS_TO_IDLE && lastTickTimestamp;
  if (closeLastPour && activePourIndex > 0) {
    // if last tick timestamp exceeds the MS_TO_IDLE threshold,
    //   finish previous pour before creating a new one
    activePour.endPourWithTimestampAndVolume(
      lastTickTimestamp,
      currentMeter.getCurrentFlowVolume()
    );
    currentMeter.makeIdle();
    completedPours.push(activePour);
    // if pour volume is above threshold, push to server
    if (activePour.getPourVolume() > MINIMUM_VOLUME) {
      await pushCompletePourToTap(activePour);
    }
    console.log(
      `KNB: ${currentMeter.getIdentity()} Pour Completed -- ${activePour.getPourVolume()}mL`
    );
    activePour = new Pour(currentMeter.getIdentity());
  }

  currentMeter.addTick();
  activePours.push(activePour);
};

const closeAllStalePours = async () => {
  for (let index = 0; index < activePours.length; index++) {
    const pour = activePours[index];
    const meter = flowMeterObjects[pour.getMeterIdentity()];
    const lastMeterTimestamp = meter.getLastTickTimestamp();
    const currentTimestamp = Date.now();

    // if last tick timestamp exceeds the MS_TO_IDLE threshold, finish pour
    if (
      currentTimestamp - lastMeterTimestamp > MS_TO_IDLE &&
      lastMeterTimestamp
    ) {
      pour.endPourWithTimestampAndVolume(
        lastMeterTimestamp,
        meter.getCurrentFlowVolume()
      );
      meter.makeIdle();
      completedPours.push(pour);
      activePours.splice(index, 1);
      // if pour volume is above threshold, push to server
      if (pour.getPourVolume() > MINIMUM_VOLUME) {
        await pushCompletePourToTap(pour);
      }
      console.log(
        `KNB: ${meter.getIdentity()} Pour Completed -- ${pour.getPourVolume()}mL`
      );
    }
  }
};

for (const [meterIdentity, tapIdentity] of Object.entries(
  FLOW_METER_TO_TAP_MAPPING
)) {
  console.log(
    `KNB: Initializing flow meter ${meterIdentity} for tap ${tapIdentity}`
  );
  const channelId = FLOW_METER_TO_CHANNEL_MAPPING[meterIdentity];
  rpio.open(channelId, rpio.INPUT);
  flowMeterObjects[meterIdentity] = new FlowMeter(
    meterIdentity,
    tapIdentity,
    TICKS_TO_ML
  );
  lastMeters[meterIdentity] = meters[meterIdentity] = rpio.read(channelId);
}

while (true) {
  let activeTick = false;
  for await (const [meterIdentity, channelId] of Object.entries(
    FLOW_METER_TO_CHANNEL_MAPPING
  )) {
    meters[meterIdentity] = rpio.read(channelId);
    // A change indicates meter activity
    if (meters[meterIdentity] !== lastMeters[meterIdentity]) {
      logPour(flowMeterObjects[meterIdentity]);
      lastMeters[meterIdentity] = meters[meterIdentity];
      activeTick = true;
    }
  }
  if (!activeTick) {
    await closeAllStalePours();
  }

  rpio.msleep(10);
}
