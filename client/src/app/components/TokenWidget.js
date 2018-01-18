// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
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
    display: 'flex',
    flexDirection: 'column',
  },
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
          <Link to={`/token/${token.identifier}`}>
            <El nightMode={nightMode} type={'span'}>
              {token.longName}
            </El>
          </Link>
          <El nightMode={nightMode} type={'span'}>
            {token.shortName}
          </El>
        </div>
      </div>
    );
  }
}

export default TokenWidget;
