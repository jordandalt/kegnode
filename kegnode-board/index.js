import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

import FlowMeter from "./src/FlowMeter";
import Pour from "./src/Pour";

const FLOW_METER_TO_TAP_MAPPING = {
  flow0: "tap0",
  flow1: "tap1",
  flow2: "tap2",
  flow3: "tap3",
};
const MS_TO_IDLE = 10000;

const flowMeters = {};
const activePours = [];
const completedPours = [];

const port = new SerialPort({ path: "/dev/ttyACM0", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const pushCompletePourToTap = async (completedPour) => {
  fetch(`http://localhost:3000/taps/${completedPour.getTapIdentity()}`, {
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
  console.log(data);
  // parse out monitor identity
  const parsedMeterIdentity = null;
  if (parsedMeterIdentity) {
    const currentMeter = flowMeters[parsedMeterIdentity];

    // get monitor's last tick timestamp
    const lastTickTimestamp = currentMeter.getLastTickTimestamp();

    // find activePour or create new pour
    const activePourIndex = activePours.findIndex(
      (pour) => pour.getTapIdentity() === currentMeter.getTapIdentity()
    );
    let activePour =
      activePourIndex < 0
        ? new Pour(currentMeter.tapIdentity())
        : activePours.splice(activePourIndex, 1)[0];

    const currentTimestamp = now();
    const closeLastPour = currentTimestamp - lastTickTimestamp > MS_TO_IDLE;
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
      // pushCompletePourToTap(activePour);
      console.log(`KNB: Completing last pour for flow meter ${parsedMeterIdentity}`);
      activePour = new Pour(currentMeter.tapIdentity());
    } else if (closeLastPour && activePourIndex < 0) {
      throw new Error(
        `Unable to complete last pour for meter ${parsedMeterIdentity}: no matching pour found!`
      );
    }

    currentMeter.addTick();
    activePours.push(activePour);
    console.log(`KNB: Flow meter ${parsedMeterIdentity} is actively pouring`);
  }
});
