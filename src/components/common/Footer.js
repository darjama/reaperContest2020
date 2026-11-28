import React from 'react';
import '../../css/footer.css';

const COLUMNS = [
  {
    title: 'Contest',
    links: [
      ['/getstarted', 'Get Started'],
      ['/archive', 'Archive'],
      ['/results', 'Results'],
    ],
  },
  {
    title: 'Community',
    links: [
      ['https://forums.cockos.com/forumdisplay.php?f=24', 'Reaper Forums'],
      ['https://github.com/darjama/reaperContest2020', 'GitHub'],
      [
        'https://www.paypal.com/donate/?hosted_button_id=JHVM2LWFUYCBY',
        'Donate',
      ],
      ['/contact', 'Contact'],
    ],
  },
];

// Rendered outside the router, so these are plain anchors
var Footer = function () {
  return (
    <footer className='site-footer'>
      <div className='footer-grid'>
        <div>
          <h4 className='cabin'>reaMIXed</h4>
          <p>The (unauthorized) Reaper mix contest. Not affiliated with Cockos.</p>
        </div>
        {COLUMNS.map(({ title, links }) => (
          <div key={title}>
            <h4>{title}</h4>
            {links.map(([href, label]) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className='footer-legal'>
        &copy; 2020&ndash;{new Date().getFullYear()} reaMIXed
      </div>
    </footer>
  );
};

export default Footer;
