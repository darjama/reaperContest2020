import React from 'react';
// import { Link } from "react-router-dom";
import { Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';

class ExcludeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  render() {
    let date = new Date();
    let start = new Date(this.props.start);
    let end = new Date(this.props.end);
    let { setExcluded, contestId, entries } = this.props;

    entries.sort((a, b) => {
      if (a.contestant.toLowerCase() > b.contestant.toLowerCase()) return 1;
      return -1;
    });

    return (
      <Modal
        show={this.state.show && date >= start && date <= end}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Who Are You</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Did you submit a mix for this month's contest?</p>
            <p>If so, please select your username below:</p>
          </div>
          <DropdownButton id='dropdown-basic-button' title='Who Are You?'>
            <Dropdown.Item
              onSelect={() => {
                const localE = JSON.stringify({
                  mixnum: null,
                  contestId: contestId,
                });
                localStorage.setItem('excluded', localE);
                setExcluded(null);
                this.setState({ show: false });
              }}
            >
              {' '}
              I didn't mix this month
            </Dropdown.Item>
            {entries.map((entry) => (
              <Dropdown.Item
                key={entry._id}
                onSelect={() => {
                  const localE = JSON.stringify({
                    mixnum: entry.mixnum,
                    contestId: contestId,
                  });
                  localStorage.setItem('excluded', localE);
                  setExcluded(entry.mixnum);
                  this.setState({ show: false });
                }}
              >
                {entry.contestant}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ExcludeModal;
