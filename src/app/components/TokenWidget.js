// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from './El';

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
    nightMode: PropTypes.bool.isRequired,
    token: PropTypes.object.isRequired,
  };

  render()
  {
    const {
      nightMode,
      token,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.section)}>
          <img src={token.imageUrl} width={48} height={48}></img>
        </div>
        <div className={css(styles.section, styles.sectionRight)}>
          <El nightMode={nightMode} type={'span'}>
            {token.shortName}
          </El>
          <El nightMode={nightMode} type={'span'}>
            {token.longName}
          </El>
        </div>
      </div>
    );
  }
}

export default TokenWidget;
