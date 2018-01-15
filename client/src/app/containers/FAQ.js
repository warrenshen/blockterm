// @flow weak

import { connect }   from 'react-redux';
import { compose }   from 'react-apollo';
import FAQ           from '../views/FAQ';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    nightMode: state.globals.nightMode,
  };
};

export default connect(mapStateToProps)(FAQ);
