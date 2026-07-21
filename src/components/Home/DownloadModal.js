import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const rules = [
  'Your mix should be done with Reaper using native and JSFX effects',
  'source files should not be glued, re-rendered or destructively edited.',
  'additional samples should not be used, but reverb impulses are allowed',
  'submissions should include a FLAC mix, reaper project file, any impulses and any non standard/Tukan jsfx files',
];
/**
 * @param {{ open: boolean; toggle: VoidFunction; url: string; }} props
 */
function DownloadModal(props) {

  const {open, toggle, url} = props



    return (
      <Modal show={open} backdrop='static' keyboard={false} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Before you download...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          These are theh basic rules of the contest:
          <div style={{ padding: '20px'}}>

          <ul>
            {rules.map((rule, index) => (
              <li key={rule}>
                {rule}
              </li>
            ))}
          </ul>
          </div>
          <Link to='/getstarted'>See full contest rules</Link>
          <br />
          <br />
          <Button
            href={url}
            type='button'
            onClick={toggle}
            style={{ fontSize: '1.2rem' }}
          >
            Download now
          </Button>
        </Modal.Body>
      </Modal>
    );
  }

export default DownloadModal;
