import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const PointsGraph = function ({ pointsData, isArchive }) {
  const [sortResult, setSortResult] = useState('mixnum');
  const [sortDesc, setSortDesc] = useState(false);

  let maxScore = 0;

  const resultRows = (sortResult === 'contestant'
    ? pointsData.sort((a, b) => {
        if (a.contestant.toUpperCase() > b.contestant.toUpperCase())
          return 1 - sortDesc * 2;
        return -1 + sortDesc * 2;
      })
    : pointsData.sort((a, b) =>
        sortDesc ? b[sortResult] - a[sortResult] : a[sortResult] - b[sortResult]
      )
  ).map((row) => {
    maxScore = Math.max(maxScore, row.avg);
    return (
      <tr key={row.contestant + row.mixnum}>
        <td>{row.mixnum}</td>
        <td>{row.contestant}</td>
        <td>{row.avg}</td>
        <td>{row.dynamicRange}</td>
        <td>{row.trackCount}</td>
      </tr>
    );
  });
  const winners = pointsData
    .filter((a) => a.avg == maxScore)
    .map((a) => a.contestant);

  return (
    <div className='result-graph'>
      {!isArchive && (
        <div style={{ color: 'yellow', textAlign: 'center' }}>
          {winners.length <= 1 ? (
            <h2>... and the winner is: {winners[0] || '... '}!</h2>
          ) : (
            <h2>And the winners are: {winners.join(' and ')}!</h2>
          )}
          Congratulations! The winner(s) get to help pick the song for next
          month's contest, not to mention the love and adoration of their peers.
          Thanks to all who participated!
        </div>
      )}
      <br />
      <div>
        <p style={{ fontSize: '1.3rem' }}>
          Click on the headers to sort table, click again to toggle between
          ascending and descending.
        </p>
        <Table variant='dark' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th
                onClick={() =>
                  sortResult === 'mixnum'
                    ? setSortDesc(!sortDesc)
                    : setSortResult('mixnum')
                }
              >
                Mix #
              </th>
              <th
                onClick={() =>
                  sortResult === 'contestant'
                    ? setSortDesc(!sortDesc)
                    : setSortResult('contestant')
                }
              >
                Contestant
              </th>
              <th
                onClick={() =>
                  sortResult === 'avg'
                    ? setSortDesc(!sortDesc)
                    : setSortResult('avg')
                }
              >
                Average Rating
              </th>
              <th
                onClick={() =>
                  sortResult === 'dynamicRange'
                    ? setSortDesc(!sortDesc)
                    : setSortResult('dynamicRange')
                }
              >
                Dynamic Range
              </th>
              <th
                onClick={() =>
                  sortResult === 'trackCount'
                    ? setSortDesc(!sortDesc)
                    : setSortResult('trackCount')
                }
              >
                Track Count
              </th>
            </tr>
          </thead>
          <tbody>{resultRows}</tbody>
        </Table>
        <p style={{ fontSize: '1.3rem' }}>
          Ratings are given in half star increments, from 1/2 star to 5 stars.
        </p>
      </div>
    </div>
  );
};

export default PointsGraph;
