import React, {useState, useEffect} from 'react';
import { Form, Col } from 'react-bootstrap';

const MarkerList = function({ markers, start, end, setStart, setEnd, duration }) {


  const displayTime = function(seconds) {
    return Math.floor(Number(seconds / 60)).toString() + ':' + ('0' + (seconds % 60).toString()).slice(-2);
  }

 return (
    <Form inline>
          <Form.Group controlId="formGridState">
            <Form.Label>Start </Form.Label>
            <Form.Control size="sm" as="select" defaultValue={0} onChange={(e)=> setStart(Number(e.target.value))} className='player-button'>
              <option disabled>Select Start</option>
              {markers.map((marker, i) => (
                <option key={marker.name} value={marker.time} disabled={marker.time >= end} >
                  {marker.name} {displayTime(marker.time)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGridState2">
            <Form.Label>End </Form.Label>
            <Form.Control size="sm" as="select" defaultValue={markers[markers.length -1].time} onChange={(e)=> setEnd(Number(e.target.value))} className='player-button'>
              <option disabled>Select End</option>
              {markers.map((marker, i) => {
                if (marker.time) return (
                <option key={marker.name} value={marker.time} disabled={marker.time <= start} >
                  {marker.name} {displayTime(marker.time)}
                </option>
                )}
              )}
            </Form.Control>
          </Form.Group>
    </Form>
  )

}

export default MarkerList;