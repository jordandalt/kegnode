import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.on("open", () => {
  console.log('Arduino serial port open');
});

parser.on('data', data => {
  console.log(data);
});
