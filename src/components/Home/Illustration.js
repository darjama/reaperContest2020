import * as React from 'react';

const CHANNELS = [110, 173, 236, 299, 362, 425, 488];
const FADER_CAPS = [338, 352, 342, 360, 346, 334, 355];

// Line drawing of a pair of headphones above a mixing console
export default function Illustration() {
  return (
    <svg className='hm-art' viewBox='30 30 540 365' aria-hidden='true'>
      <path d='M192 168C192 40 408 40 408 168' />
      <path className='hm-soft' d='M204 160C204 62 396 62 396 160' />
      <rect x='170' y='160' width='40' height='78' rx='16' />
      <rect x='390' y='160' width='40' height='78' rx='16' />
      <path className='hm-soft' d='M180 180V218M420 180V218' />
      <path d='M190 238C170 290 110 250 84 300' />
      <path d='M30 385L70 285H530L570 385Z' />
      <path className='hm-soft' d='M82 300H518' />
      {CHANNELS.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy='305' r='8' />
          <path d={`M${x} 305V297M${x} 327V373`} />
          <rect x={x - 8} y={FADER_CAPS[i]} width='16' height='9' rx='2' />
        </g>
      ))}
    </svg>
  );
}
