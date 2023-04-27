import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import FullTap from "../components/FullTap";
import OpenTap from "../components/OpenTap";
import { useInterval, useTaps } from "../hooks/tapHooks";

const Taps = () => {
  const [getTaps, { response, error, loading }] = useTaps();

  useInterval(() => getTaps(), 1000*5);

  const taps = response?.data;
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
      <Row xs={1} md={2} className="g-4">
        {taps &&
          taps.map((tap) => (
            <Col key={tap.identity}>
              {tap.Keg ? <FullTap tap={tap} /> : <OpenTap tap={tap} />}
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Taps;
