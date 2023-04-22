import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

import FlowMeter from "./src/FlowMeter.js";
import Pour from "./src/Pour.js";

const FLOW_METER_TO_TAP_MAPPING = {
  flow0: "tap0",
  flow1: "tap1",
  flow2: "tap2",
  flow3: "tap3",
};
const MS_TO_IDLE = 1000;
const meterRegex = /flow[0-3]/;
const flowMeters = {};
const activePours = [];
const completedPours = [];

const path = process.env.PATH_TO_ARDUINO || "/dev/ttyACM0";
const port = new SerialPort({ path, baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const pushCompletePourToTap = async (completedPour) => {
  const tapIdentity =
    FLOW_METER_TO_TAP_MAPPING[completedPour.getMeterIdentity()];
  fetch(`http://localhost:3000/taps/${tapIdentity}`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
    body: JSON.stringify(completedPour.toJSON()),
  });
};

port.on("open", () => {
  console.log("Arduino serial port open");
  for (const [meterIdentity, tapIdentity] of Object.entries(
    FLOW_METER_TO_TAP_MAPPING
  )) {
    console.log(
      `KNB: Initializing flow meter ${meterIdentity} for tap ${tapIdentity}`
    );
    flowMeters[meterIdentity] = new FlowMeter(meterIdentity, tapIdentity, 2);
  }
});

parser.on("data", (data) => {
  // parse out monitor identity
  const parsedMeterIdentity = meterRegex.exec(data);
  if (parsedMeterIdentity) {
    const currentMeter = flowMeters[parsedMeterIdentity];

    // get monitor's last tick timestamp
    const lastTickTimestamp = currentMeter.getLastTickTimestamp();

    // find activePour or create new pour
    const activePourIndex = activePours.findIndex(
      (pour) => pour.getMeterIdentity() === currentMeter.getIdentity()
    );
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
      // @TODO: uncomment when ready
      // if pour volume is above threshold, push to server
      // pushCompletePourToTap(activePour);
      console.log(`KNB: ${parsedMeterIdentity} Pour Completed`);
      activePour = new Pour(currentMeter.getIdentity());
    }

    currentMeter.addTick();
    activePours.push(activePour);
    console.log(`KNB: ${parsedMeterIdentity} Pouring`);
  } else {
    // Let's use the health signal to close any active pours that meet the idle threshold
    activePours.map((pour, index) => {
      const meter = flowMeters[pour.getMeterIdentity()];
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
        // @TODO: uncomment when ready
        // if pour volume is above threshold, push to server
        // pushCompletePourToTap(activePour);
        console.log(`KNB: ${meter.getIdentity()} Pour Completed`);
      }
    });
  }
});
