// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    paddingTop: '6px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionRight: {
    paddingLeft: '12px',
  }
});

class TokenWidget extends PureComponent {
  static propTypes = {
    token: PropTypes.object.isRequired,
  };

  render()
  {
    const {
      token,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.section)}>
          <img src={token.imageUrl} width={48} height={48}></img>
        </div>
        <div className={css(styles.section, styles.sectionRight)}>
          <span>{token.shortName}</span>
          <span>{token.longName}</span>
        </div>
      </div>
    );
  }
}

export default TokenWidget;
