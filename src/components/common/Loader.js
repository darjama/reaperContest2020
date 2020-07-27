import React from 'react';
import {connect} from 'react-redux';
import {fetchContestDetails} from '../../redux/contestDetails/contestDetailActions';

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchContestDetails();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    details: state.contestDetailReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchContestDetails: () => dispatch(fetchContestDetails()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)