import {Card, Form, Button} from 'react-bootstrap'

var VoteCard = function({id, url, notes}) {

  return (
    <Card width='20rem'>
      <Card.Title>{name}</Card.Title>
      <Card.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows="4" onChange={changeHandler}>
              {notes}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button variant="secondary">Add to Playlist</Button>
        <br/>
        Vote
        <br/>
        <Button variant="primary" key='one' onClick={clickHandler}>1st</Button>
        <Button variant="primary" key='two' onClick={clickHandler}>2nd</Button>
        <Button variant="primary" key='three' onClick={clickHandler}>3rd</Button>
        <Button variant="primary" key='clear' onClick={clickHandler}>remove</Button>
      </Card.Body>
    </Card>
  )
}

export default VoteCard;