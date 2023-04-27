import Card from "react-bootstrap/Card";

const OpenTap = ({ tap }) => (
  <Card>
    <Card.Header>
      <h1>Tap {tap.identity[3]}</h1>
    </Card.Header>{" "}
    <Card.Body>
      <h3>
        <em>Tap available</em>
      </h3>
    </Card.Body>
    <Card.Footer>Last Keg Kicked: XXXX</Card.Footer>
  </Card>
);

export default OpenTap;
