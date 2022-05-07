import React, { useState } from 'react';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  MarkSeries,
  ChartLabel,
} from 'react-vis';
import { Form, Container } from 'react-bootstrap';
import { range } from 'lodash';

export default function VoteStats(props) {
  const { votes } = props;
  const [graphType, setGraphType] = useState('distribution');
  const allVotes = {};
  const rangeData = [];
  const averageData = [];

  votes.forEach((voter, index) => {
    let lowest = Infinity;
    let highest = -Infinity;
    let total = 0;
    let count = 0;
    Object.values(voter.ratings).forEach((vote) => {
      if (vote > 5) return;
      lowest = Math.min(lowest, Number(vote));
      highest = Math.max(highest, Number(vote));
      allVotes[vote] = (allVotes[vote] ?? 0) + 1;
      total += vote;
      count++;
    });
    rangeData.push({ x: total / count, y0: lowest, y: highest });
    averageData.push({ x: index + 1, y: total / count });
  });

  rangeData.sort((a, b) => a.x - b.x);
  rangeData.forEach((data, index) => {
    data.x = index + 1;
  });
  averageData.sort((a, b) => a.y - b.y);
  averageData.forEach((data, index) => {
    data.x = index + 1;
  });

  const values = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const allVoteData = [];

  values.forEach((value) => {
    allVoteData.push({
      x: value,
      y: allVotes[value] ?? 0,
    });
  });

  const data = {
    distribution: allVoteData,
    'vote range': rangeData,
  };

  const title = {
    distribution: { x: 'Rating', y: 'Vote Count' },
    'vote range': { x: 'Voter by Average Vote', y: 'Rating' },
  };

  return (
    <Container style={{ border: 'solid grey 1.5px', borderRadius: '.25em' }}>
      <h3 style={{ textAlign: 'center' }}> Voting Stats </h3>
      <Form onChange={(e) => setGraphType(e.target.id)}>
        {['distribution', 'vote range'].map((label) => (
          <Form.Check
            inline
            type={'radio'}
            name='graphType'
            id={label}
            label={label}
            key={label}
            defaultChecked={label === 'distribution'}
            style={{ fontSize: '.8em' }}
          />
        ))}
      </Form>
      <FlexibleWidthXYPlot
        xType='ordinal'
        height={300}
        margin={{ left: 60, right: 10, top: 10, bottom: 60 }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <VerticalBarSeries
          color={graphType === 'distribution' ? 'white' : 'yellow'}
          data={data[graphType]}
          barWidth={0.75}
          animation
        />
        {graphType === 'vote range' && (
          <MarkSeries data={averageData} color='green' animation />
        )}
        <XAxis
          style={{
            text: { fill: 'white' },
          }}
        />
        <YAxis
          animation
          style={{
            text: { fill: 'white' },
          }}
        />
        <ChartLabel
          text={title[graphType].y}
          includeMargin={true}
          xPercent={0.025}
          yPercent={0}
          style={{
            fill: 'white',
            transform: 'rotate(-90)',
            textAnchor: 'end',
          }}
        />
        <ChartLabel
          text={title[graphType].x}
          includeMargin={false}
          xPercent={0.35}
          yPercent={1.25}
          style={{
            fill: 'white',
            textAlign: 'right',
          }}
        />
      </FlexibleWidthXYPlot>
    </Container>
  );
}
