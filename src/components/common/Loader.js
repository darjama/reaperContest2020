import React from 'react';
import {connect} from 'react-redux';
import {fetchContestDetails} from '../../redux/contestDetails/contestDetailActions';
import {fetchEntriesDetails} from '../../redux/entries/entriesActions';
class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchContestDetails();
    this.props.fetchEntriesDetails();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    details: state.contestDetailReducer,
    entries: state.entriesDetailReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchContestDetails: () => dispatch(fetchContestDetails()),
    fetchEntriesDetails: () => dispatch(fetchEntriesDetails()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)