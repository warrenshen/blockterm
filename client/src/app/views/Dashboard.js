// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import Sidebar             from 'react-sidebar';
import FontAwesome         from 'react-fontawesome';
import * as STYLES         from '../constants/styles';
import PROJECT_VERSION     from '../constants/items';
import DashboardTabs       from '../containers/DashboardTabs';
import DashboardSidebar    from '../components/DashboardSidebar';
import DashboardItemLarge  from '../components/DashboardItemLarge';
import El                  from '../components/El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  shield: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: '9000',
  },
  addToButton: {
    letterSpacing: '1px !important',
    fontSize: '12px',
    fontWeight: '700',
    borderBottom: '1px solid #777',
  },
  actionBar: {
    zIndex: '1',
    position: 'fixed',
    width: '100%',
    bottom: '0px',
    right: '0px',
    borderBottom: '0px',
    backgroundColor: 'white',
    borderTop: '1px solid #777',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '58px',
  },
  darkActionBar: {
    borderTop: '1px solid #999',
    backgroundColor: '#000',
  },
  actionButton: {
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderColor: '#333',
    borderTop: '0px',
    borderBottom: '0px',
    //boxShadow: '0px -1px 0px rgba(128, 128, 128, 0.5)',
    ':hover': {
      color: '#23527c',
    },
  },
  darkActionButton: {
    //borderColor: '#fff !important',
  },
  emphasize: {
    backgroundColor: STYLES.GOLD,
  },
  darkEmphasize: {
    //backgroundColor: STYLES.GOLD,
  },
  overlay: {
    display: 'flex',
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: '3',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(79, 79, 79, 0.95)',
  },
  overlaySide: {
    display: 'flex',
    flexDirection: 'column',
    width: '256px',
  },
  overlaySideHeader: {
    display: 'flex',
  },
  alerts: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
});

class Dashboard extends PureComponent
{
  constructor(props)
  {
    super(props);

    const {
      changeScrollActive,
    } = props;

    this.handleScroll = (event) => {
      changeScrollActive(true);
      window.clearTimeout(window.isScrolling);
      window.isScrolling = setTimeout(function() {
        changeScrollActive(false);
      }, 256);
    };
  }

  componentDidMount()
  {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount()
  {
    window.removeEventListener('scroll', this.handleScroll);
  }

  renderAddButton()
  {
    const {
      changeSidebarMode,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.actionBar, nightMode && styles.darkActionBar)}>
        <Link to={`/faq`}>
          <button
            title="Press to read FAQ and learn dashboard actions"
            className={css(styles.actionButton, nightMode && styles.darkActionButton)}>
            Help [?]
          </button>
        </Link>
        <button
          title="Press to open up sidebar and add widgets to dashboard"
          className={css(styles.actionButton, nightMode && styles.darkActionButton, styles.emphasize, nightMode && styles.darkEmphasize)}
          onClick={(event) => changeSidebarMode('add')} >
          Add Widget To Dashboard [+]
        </button>
      </div>
    );
  }

  renderScrollShield()
  {
    const {
      scrollActive,
    } = this.props;

    if (scrollActive)
    {
      return <div className={css(styles.shield)} />;
    }
  }

  renderAlerts()
  {
    const {
      nightMode,
      user,
    } = this.props;

    console.log(user);
    return (
      <div>
        {
          user !== null ? [
            <form>
              <input
                autoFocus={true}
                className={css(styles.inputField, nightMode && styles.fieldNight)}
                placeholder='email/username'
                required='required'
                value={''}
                // onChange={(event) => changeEmail(event.target.value)}
              />
              <input
                className={css(styles.inputField, nightMode && styles.fieldNight)}
                placeholder='password'
                type='password'
                required='required'
                value={''}
                // onChange={(event) => changePassword(event.target.value)}
                // onKeyPress={onKeyPress}
              />
            </form>,
            <div className={css(styles.alerts)}>
              {user.alerts.map((alert) => (
                <div>
                  Alert
                </div>
              ))}
            </div>
          ] : (
            <El
              nightMode={nightMode}
              type={'h5'}
            >
              LOGIN or JOIN to use alerts
            </El>
          )
        }
      </div>
    );
  }

  renderModal()
  {
    const {
      modalDashboardItemId,
      nightMode,
      user,

      changeModalState,
    } = this.props;

    if (modalDashboardItemId !== null)
    {
      return (
        <div className={css(styles.overlay)}>
          <DashboardItemLarge
            nightMode={nightMode}
          />
          <div className={css(styles.overlaySide)}>
            <div className={css(styles.overlaySideHeader)}>
              <button
                onClick={(event) => changeModalState(null)}
              >
                <FontAwesome name='close' className={css(styles.icon)} />
              </button>
            </div>
            {this.renderAlerts()}
          </div>
        </div>
      );
    }
  }

  render()
  {
    const {
      keySelectValue,
      nightMode,
      scrollActive,
      sidebarMode,
      valueSelectValue,

      addToLayout,
      changeDashboardItemState,
      changeKeySelectValue,
      changeSelectedTab,
      changeSidebarMode,
      changeValueSelectValue,
      updateLayoutItem,
    } = this.props;

    const overlayStyle = {
      transition: 'opacity .2s ease-out, visibility .2s ease-out',
      backgroundColor: `rgba(0, 0, 0, ${nightMode ? 0.4 : 0.18})`,
      zIndex: '2',
    };

    return (
      <div className={css(styles.container)}>
        {this.renderScrollShield()}
        {this.renderModal()}
        <Sidebar
          sidebar={(
            <DashboardSidebar
              keySelectValue={keySelectValue}
              sidebarMode={sidebarMode}
              valueSelectValue={valueSelectValue}

              addToLayout={addToLayout}
              changeKeySelectValue={changeKeySelectValue}
              changeSidebarMode={changeSidebarMode}
              changeValueSelectValue={changeValueSelectValue}
              updateLayoutItem={updateLayoutItem}
            />
          )}
          docked={false}
          open={sidebarMode !== null}
          pullRight={true}
          shadow={true}
          touch={false}
          transitions={false}
          onSetOpen={() => changeSidebarMode(null)}
          styles={
            {
              root: {
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'visible',
              },
              overlay: overlayStyle,
              content: {
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflowY: 'visible',
              },
              sidebar: {
                display: 'flex',
                zIndex: '3',
              },
            }
          }
        >
          <DashboardTabs />
          {this.renderAddButton()}
        </Sidebar>
      </div>
    );
  }
}

export default Dashboard;
