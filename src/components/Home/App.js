import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeContest from './HomeContest.js';
import HowItWorks from './HowItWorks.js';
import Illustration from './Illustration.js';
import DownloadModal from './DownloadModal.js';
import '../../css/home.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadModal: false,
    };
    this.toggleDownloadModal = this.toggleDownloadModal.bind(this);
  }

  componentDidMount() {
    document.title = 'reaMIXed: The (Unauthorized) Reaper Mix Contest';
  }

  toggleDownloadModal() {
    this.setState((prevState) => ({
      showDownloadModal: !prevState.showDownloadModal,
    }));
  }

  render() {
    const { details } = this.props;

    // details is {} while the fetch is still in flight and null once it
    // found no contest for the current month
    const noContest = details == null;

    return (
      <div className='hm'>
        {noContest ? (
          <header className='hm-hero'>
            <div className='hm-wrap hm-hero-grid'>
              <div>
                <h1 className='hm-phase'>No Contest</h1>
                <p>
                  There is no contest currently available, please check back
                  soon. Use the <Link to='/contact'>contact form</Link> if you
                  believe you are getting this message in error.
                </p>
              </div>
              <div className='hm-side'>
                <Illustration />
              </div>
            </div>
          </header>
        ) : (
          <React.Fragment>
            <DownloadModal
              open={this.state.showDownloadModal}
              toggle={this.toggleDownloadModal}
              url={details.rawuri}
            />
            <HomeContest
              details={details}
              onGetTracks={this.toggleDownloadModal}
            />
          </React.Fragment>
        )}
        <HowItWorks />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.contestDetailReducer,
  };
};

export default connect(mapStateToProps)(App);
