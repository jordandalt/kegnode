import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useUpsertKeg } from "../hooks/adminHooks";

const KegForm = ({ keg = null, handleClose, editKeg = true, taps }) => {
  const [createOrUpdateKeg] = useUpsertKeg();
  const [brewery, setBrewery] = useState(keg?.Beer?.brewery || "");
  const [name, setName] = useState(keg?.Beer?.name || "");
  const [type, setType] = useState(keg?.Beer?.type || "");
  const [description, setDescription] = useState(keg?.Beer?.description || "");
  const [abv, setAbv] = useState(keg?.Beer?.alcoholByVolume || "");
  const [initialVolume, setInitialVolume] = useState(keg?.initialVolume || "");
  const [currentVolume, setCurrentVolume] = useState(keg?.currentVolume || "");
  const [tapIdentity, setTapIdentity] = useState(keg?.Tap?.identity || "");

  const kegObject = {
    brewery,
    name,
    type,
    description,
    abv,
    initialVolume,
    currentVolume,
    tapIdentity,
  };

  if (keg && keg.identity) {
    kegObject.identity = keg.identity;
  }

  const handleSave = async (event) => {
    event.preventDefault();
    await createOrUpdateKeg(kegObject);
    handleClose();
  };

  const handleCancel = () => {
    setBrewery(keg?.Beer?.brewery || "");
    setName(keg?.Beer?.name || "");
    setType(keg?.Beer?.type || "");
    setDescription(keg?.Beer?.description || "");
    setAbv(keg?.Beer?.alcoholByVolume || "");
    setInitialVolume(keg?.initialVolume || "");
    setCurrentVolume(keg?.currentVolume || "");
    setTapIdentity(keg?.Tap?.identity || "");
    handleClose();
  };

  return (
    <Form onSubmit={handleSave}>
      <fieldset disabled={!editKeg}>
        <Form.Group as={Row} className="mb-3" controlId="brewery">
          <Form.Label column sm={4}>
            Brewery
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              value={brewery}
              onChange={(e) => setBrewery(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="name">
          <Form.Label column sm={4}>
            Beer Name
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="type">
          <Form.Label column sm={4}>
            Beer Type
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="description">
          <Form.Label column sm={4}>
            Description
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="abv">
          <Form.Label column sm={4}>
            Alcohol By Volume
          </Form.Label>
          <Col sm={8}>
            <InputGroup>
              <Form.Control
                type="text"
                value={abv}
                onChange={(e) => setAbv(e.target.value)}
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="initialVolume">
          <Form.Label column sm={4}>
            Initial Volume
          </Form.Label>
          <Col sm={8}>
            <InputGroup>
              <Form.Control
                type="text"
                value={initialVolume}
                onChange={(e) => setInitialVolume(e.target.value)}
              />
              <InputGroup.Text>mL</InputGroup.Text>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="currentVolume">
          <Form.Label column sm={4}>
            Current Volume
          </Form.Label>
          <Col sm={8}>
            <InputGroup>
              <Form.Control
                type="text"
                value={currentVolume}
                onChange={(e) => setCurrentVolume(e.target.value)}
              />
              <InputGroup.Text>mL</InputGroup.Text>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="tapIdentity">
          <Form.Label column sm={4}>
            Tap
          </Form.Label>
          <Col sm={8}>
            <Form.Select
              value={tapIdentity}
              onChange={(e) => setTapIdentity(e.target.value)}
            >
              <option value={""}>Not tapped</option>
              {taps.map((tap) => (
                <option
                  key={tap.identity}
                  value={tap.identity}
                  disabled={tap.KegIdentity || currentVolume > 0}
                >
                  {tap.identity}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Button variant="secondary" onClick={handleCancel} className="m-1">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </fieldset>
    </Form>
  );
};
export default KegForm;
