import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { useAdminTaps } from "../adminHooks";

// @TODO do we need this route?
const TapsAdmin = () => {
  const { response, loading, error } = useAdminTaps();
  const taps = response?.data;

  return (
    <>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && (
        <Alert key="warning" variant="warning">
          `Error loading tap data: ${error.message}`
        </Alert>
      )}
      <Row xs={1} md={2} className="g-4">
        {taps &&
          taps.length &&
          taps.map((tap, index) => {
            const { identity, Keg } = tap;

            return (
              <Col>
                <Card key={identity}>
                  <Card.Header>Tap {index}</Card.Header>
                  <Card.Body>
                    {Keg
                      ? `Now on tap: ${Keg.brewery} / ${Keg.beerName}`
                      : "No keg on tap!"}
                  </Card.Body>
                  <Card.Footer>
                    {Keg &&
                      `${Keg.currentVolume} mL of ${Keg.initialVolume} mL remaining`}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default TapsAdmin;
