import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import KegForm from "./KegForm";

const Keg = ({ keg, getKegs, taps}) => {
  const [editKeg, setEditKeg] = useState(false);
  const { currentVolume, Tap } = keg;

  const handleClose = () => {
    setEditKeg(false);
    getKegs();
  }

  return (
    <Card>
      <Card.Header></Card.Header>
      <Card.Body>
        <KegForm keg={keg} handleClose={handleClose} editKeg={editKeg} taps={taps}/>
      </Card.Body>
      <Card.Footer>
        Current Volume: {currentVolume} mL | {Tap ? Tap.identity : "Not tapped"}
        <Button variant="outline-secondary" onClick={() => setEditKeg(true)}>
          Edit
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Keg;
