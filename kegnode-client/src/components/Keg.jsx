import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import KegForm from "./KegForm";
import { useDeleteKeg } from "../hooks/adminHooks";

const Keg = ({ keg, taps, getKegs, getTaps }) => {
  const [deleteKeg] = useDeleteKeg();
  const [editKeg, setEditKeg] = useState(false);
  const {
    currentVolume,
    initialVolume,
    Tap,
    Beer: { brewery, name },
  } = keg;

  const handleClose = () => {
    setEditKeg(false);
    getKegs();
    getTaps();
  };

  const handleDelete = () => {
    deleteKeg(keg.identity);
    getKegs();
    getTaps();
  };

  return (
    <Card>
      <Card.Header>
        <h4>
          {brewery} {name} | <em>{Tap ? Tap.identity : "Not tapped"}</em>
        </h4>
      </Card.Header>
      <Card.Body>
        <KegForm
          keg={keg}
          handleClose={handleClose}
          editKeg={editKeg}
          taps={taps}
        />
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col sm={8}>
            Current Volume: {Math.round((currentVolume / initialVolume) * 100)}%<br/>
            Tapped on: {keg.tappedOn ? new Date(keg.tappedOn).toLocaleDateString() : "N/A"}
          </Col>
          <Col sm={4}>
            <Button
              className="m-1"
              variant="outline-secondary"
              onClick={() => setEditKeg(true)}
            >
              Edit
            </Button>
            <Button
              className="m-1"
              variant="outline-danger"
              disabled={!editKeg}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default Keg;
