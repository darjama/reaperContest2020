import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import '../../css/downloadModal.css';

const rules = [
  'Your mix should be done with Reaper using native and JSFX effects.',
  'Source files should not be glued, re-rendered or destructively edited.',
  'Additional samples should not be used, but reverb impulses are allowed.',
  'Submissions should include a FLAC mix, Reaper project file, any impulses and any non-standard/Tukan JSFX files.',
];
/**
 * @param {{ open: boolean; toggle: VoidFunction; url: string; }} props
 */
function DownloadModal(props) {
  const { open, toggle, url } = props;

  return (
    <Modal
      show={open}
      backdrop='static'
      keyboard={false}
      onHide={toggle}
      centered
      contentClassName='dl-modal'
      aria-labelledby='dl-modal-title'
    >
      <Modal.Header closeButton>
        <Modal.Title id='dl-modal-title'>Before you download</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>These are the basic rules of the contest:</p>
        <ul>
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Link to='/getstarted'>See full contest rules</Link>
        <a className='dl-download' href={url} onClick={toggle}>
          Download now
        </a>
      </Modal.Footer>
    </Modal>
  );
}

export default DownloadModal;
