import React, { useState } from 'react';
import {
  Table,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';

const Comments = function ({ allComments, allEntries }) {
  const [textFilter, setTextFilter] = useState('');
  const [mixnumFilter, setMixnumFilter] = useState(null);
  const [commenterFilter, setCommenterFilter] = useState(null);

  const allCommenters = new Set();
  allComments.forEach((a) => {
    if (a.mixnum !== 'contestId') allCommenters.add(a.commenter);
  });

  const commentRows = allComments
    .filter((a) => {
      if (a.mixnum === 'contestId') return false;
      let mixnum = a.mixnum === mixnumFilter || mixnumFilter === null;
      let commenter =
        a.commenter === commenterFilter || commenterFilter === null;
      let text =
        textFilter === '' ||
        a.comment.toUpperCase().includes(textFilter.toUpperCase());
      return mixnum && commenter && text;
    })
    .map((comment) => {
      //if (comment.mixnum !== 'contestId') return
      return (
        <tr key={comment.mixnum + comment.commenter}>
          <td>{comment.mixnum}</td>
          <td>{comment.commenter}</td>
          <td>{comment.comment}</td>
        </tr>
      );
    });

  return (
    <div style={{ color: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>Comments</h2>
      <div>
        <Table variant='dark' width='95%'>
          <tbody>
            <tr>
              <td>
                <Form>
                  <Form.Group controlId='formGridMix'>
                    <Form.Label>Filter by Mix #</Form.Label>
                    <Form.Control
                      as='select'
                      defaultValue='All'
                      onChange={(e) =>
                        e.target.value === 'All'
                          ? setMixnumFilter(null)
                          : setMixnumFilter(e.target.value)
                      }
                    >
                      <option>All</option>
                      {allEntries
                        .sort((a, b) => a.mixnum - b.mixnum)
                        .map((a) => (
                          <option
                            key={a.mixnum}
                            value={a.mixnum}
                          >{`${a.mixnum} - ${a.contestant}`}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Group controlId='formGridCommenter'>
                    <Form.Label>Filter by Commenter</Form.Label>
                    <Form.Control
                      as='select'
                      defaultValue='All'
                      onChange={(e) =>
                        e.target.value === 'All'
                          ? setCommenterFilter(null)
                          : setCommenterFilter(e.target.value)
                      }
                    >
                      <option>All</option>
                      {[...allCommenters.values()].map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </td>
              <td>
                {' '}
                Text Search
                <FormControl
                  aria-label='Small'
                  aria-describedby='inputGroup-sizing-sm'
                  placeholder='filter the comments'
                  value={textFilter}
                  onChange={(e) => setTextFilter(e.target.value)}
                  style={{ margin: '6px 0 0 0' }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Table
        variant='dark'
        striped
        bordered
        hover
        size='sm'
        style={{ width: '95%' }}
      >
        <thead>
          <tr>
            <th>Mix #</th>
            <th>Commenter</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>{commentRows}</tbody>
      </Table>
    </div>
  );
};

export default Comments;
