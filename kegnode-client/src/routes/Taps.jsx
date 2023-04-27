import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import {  useTaps } from "../hooks/tapHooks";
import TapListing from "../components/TapListing";

const Taps = () => {
  const [getTaps, { response, error, loading }] = useTaps();

  // useInterval(getTaps, 60);

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
      {taps && (
        taps.map(tap => <TapListing tap={tap} />)
      )}
    </Container>
  );
};

export default Taps;
