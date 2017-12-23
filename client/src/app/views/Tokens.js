// @flow weak

import React, {
PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import El from '../components/El';
import Sidebar from '../components/Sidebar';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    //padding: '0% 15%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  mainContent: {
    width: '80vw',
  },
  sidebar: {
    width: '20vw',
    minWidth: '20vw',
    backgroundColor: STYLES.SOFTGRAY,
  },
  header: {
    display: 'flex',
    padding: '15px 20px',
  },
  body: {
    //left: '-24px',
    borderTop: '1px solid rgba(0,0,0,0.15)',
    width: '100%',
    padding: '0px 20px 0px',
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    //borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  bodyNightMode: {
    backgroundColor: '#000',
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
  },
  image: {
    marginRight: '8px',
  },
});

class Tokens extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // etc:
    nightMode: PropTypes.bool.isRequired,
  };

  renderTokens(tokens)
  {
    const {
      nightMode,
    } = this.props;

    return (
      <div>
        <div className={css(styles.header)}>
          <El
            nightMode={nightMode}
            type={'h3'}
          >
            Coins
          </El>
        </div>
        <div className={css(styles.body, nightMode && styles.bodyNightMode)}>
          <ul className={css(styles.list)}>
            {
              tokens.map((token) => {
                return (
                  <li className={css(styles.item)} key={token.id}>
                    <img className={css(styles.image)} src={token.imageUrl} width={36} height={36}></img>
                    <Link to={`/token/${token.id}`}>
                      <El
                        nightMode={nightMode}
                        type={'h4'}
                      >
                        {token.longName}
                      </El>
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.mainContent)}>
          {
            data.allTokens &&
            this.renderTokens(data.allTokens)
          }
        </div>
        <Sidebar nightMode={nightMode}>

        </Sidebar>
      </div>
    );
  }
}

export default Tokens;
