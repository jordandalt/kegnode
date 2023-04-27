import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";

import "./TapListing.scss";

const ML_TO_OZ_RATIO = 0.033814;
const BEER_SIZE_FL_OZ = 16;

const FullTap = ({ tap }) => {
  const { identity, Keg } = tap;
  const { currentVolume, initialVolume, tappedOn, Beer, Pours } = Keg;
  const lastPour = Pours.length
    ? Pours.reduce((lastPour, thisPour) =>
        new Date(lastPour.endedOn) > new Date(thisPour.endedOn)
          ? lastPour
          : thisPour
      )
    : null;
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
            {lastPour && (
              <p>
                Last Pour: {Math.round(lastPour.volume * ML_TO_OZ_RATIO)} fl oz
                ({new Date(lastPour.endedOn).toLocaleDateString()})
              </p>
            )}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <span className="tapped-on-date">
          Tapped on {new Date(tappedOn).toLocaleDateString()}
        </span>
        <span className="beers-remaining">
          {remainingBeerCount} Beers Remaining
        </span>
      </Card.Footer>
    </Card>
  );
};

export default FullTap;
