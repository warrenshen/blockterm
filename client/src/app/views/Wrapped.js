// @flow weak

import React, {
  Component,
} from 'react';

class Wrapped extends Component
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return false;
  }

  render()
  {
    return (
      <div>Wrapped</div>
    );
  }
}

export default Wrapped;
