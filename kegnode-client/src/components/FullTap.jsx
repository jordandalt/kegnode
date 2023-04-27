import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";

import "./TapListing.scss";

const ML_TO_OZ_RATIO = 0.033814;
const BEER_SIZE_FL_OZ = 16;

const FullTap = ({ tap }) => {
  const { identity, Keg } = tap;
  const { currentVolume, initialVolume, tappedOn, Beer } = Keg;
  const { brewery, name, type, alcoholByVolume, description } = Beer;
  const volumePercentage = Math.round((currentVolume / initialVolume) * 100);
  const remainingBeerCount = Math.round(
    (currentVolume * ML_TO_OZ_RATIO) / BEER_SIZE_FL_OZ
  );

  return (
    <Card>
      <Card.Header>
        <h1>Tap {identity[3]}</h1>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col
            sm={3}
            className="pt-1 d-flex flex-column justify-content-evenly"
          >
            <div className="mb-0 text-center">
              <h5>Current Volume: {volumePercentage}%</h5>
            </div>
            <ProgressBar
              variant="warning"
              now={currentVolume}
              max={initialVolume}
              className="keg-status"
            />
          </Col>
          <Col sm={9}>
            <h3>
              {brewery} | {name}
            </h3>
            <h5>
              {type} | {alcoholByVolume}% ABV
            </h5>
            <p>{description}</p>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        Tapped on {new Date(tappedOn).toLocaleDateString()} |{" "}
        {remainingBeerCount} Beers Remaining
      </Card.Footer>
    </Card>
  );
};

export default FullTap;
