import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Keg from "../components/Keg";
import KegForm from "../components/KegForm";
import { useOpenTaps, useAdminKegs } from "../adminHooks";

const KegsAdmin = () => {
  const [showKegModal, setShowKegModal] = useState(false);
  const [getKegs, { response, loading, error }] = useAdminKegs();
  const [getOpenTaps, { response: tapsResponse, loading: tapsLoading, error: tapsError }] = useOpenTaps();
  const kegs = response?.data;
  const taps = tapsResponse?.data;

  const handleShow = () => setShowKegModal(true);
  const handleClose = () => {
    getKegs();
    getOpenTaps();
    setShowKegModal(false);
  };

  return (
    <Container className="mt-4">
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && (
        <Alert key="warning" variant="warning">
          `Error loading keg data: ${error.message}`
        </Alert>
      )}
      <Row xs={1} md={2} className="g-4 mb-4">
        {kegs && kegs.length
          ? kegs.map((keg, index) => (
              <Col key={index}>
                <Keg keg={keg} taps={taps} getKegs={getKegs}/>
              </Col>
            ))
          : "No kegs found!"}
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="d-grid gap-2">
          <Button variant="outline-primary" onClick={handleShow}>
            Create New Keg
          </Button>
        </Col>
      </Row>
      <Modal show={showKegModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Keg</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <KegForm handleClose={handleClose} editKeg={true} taps={taps} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default KegsAdmin;
