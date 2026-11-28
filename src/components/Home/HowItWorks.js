import * as React from 'react';

const STEPS = [
  {
    title: 'Mix',
    text: 'Try your hand at mixing professionally recorded tracks in a variety of genres.',
    icon: <path d='M4 6v12M9 3v18M14 8v8M19 5v14' />,
  },
  {
    title: 'Listen',
    text: 'Compare the mixes from all the contestants.',
    icon: (
      <React.Fragment>
        <path d='M4 15v-3a8 8 0 0 1 16 0v3' />
        <rect x='3' y='14' width='4' height='6' rx='1.5' />
        <rect x='17' y='14' width='4' height='6' rx='1.5' />
      </React.Fragment>
    ),
  },
  {
    title: 'Vote',
    text: 'Vote for the best mixes and learn from their projects.',
    icon: (
      <path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z' />
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className='hm-wrap hm-how'>
      <h2>How it works</h2>
      <div className='hm-steps'>
        {STEPS.map(({ title, text, icon }) => (
          <div className='hm-step' key={title}>
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              {icon}
            </svg>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
