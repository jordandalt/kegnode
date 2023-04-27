import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TapListing = ({ tap }) => {
  const { identity, Keg } = tap;
  const { currentVolume, initialVolume, tappedOn, Beer } = Keg || {};
  const { brewery, name, type, alcoholByVolume, description } = Beer || {};
  return (
    <Card>
      <Card.Header>{identity}</Card.Header>
      <Card.Body>
        <Row>
          <Col sm={4}>
            {/* @TODO: add a nice volume graphic here */}
            Current Volume: {(currentVolume / initialVolume) * 100}%
          </Col>
          <Col sm={8}>
            <h3>
              {brewery} | {name}
            </h3>
            <h5>{type} | {alcoholByVolume}% ABV</h5>
            <p>{description}</p>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>Tapped on {new Date(tappedOn).toLocaleDateString()} | XXX Beers Remaining</Card.Footer>
    </Card>
  );
};

export default TapListing;
