// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { Helmet }          from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import Sidebar             from 'react-sidebar';
import * as STYLES         from '../constants/styles';
import PROJECT_VERSION     from '../constants/items';
import DashboardModal      from '../containers/DashboardModal';
import DashboardTabs       from '../containers/DashboardTabs';
import DashboardSidebar    from '../components/DashboardSidebar';
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
  emphasize: {
    backgroundColor: STYLES.GOLD,
  },
  darkEmphasize: {
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

  renderModal()
  {
    const {
      modalIdentifier,
      nightMode,
      user,

      changeModalState,
    } = this.props;

    return modalIdentifier !== null && (
      <DashboardModal />
    );
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
        <Helmet>
          <title>Blockterm | Cryptocurrency Monitoring Terminal</title>
          <meta name="description" content="Monitor cryptocurrency/bitcoin prices and movements with Blockterm, a customizable cryptocurrency terminal built for the avid investor/trader. Set up your charts. Hunt the action with Blockterm." />
        </Helmet>
        {this.renderScrollShield()}
        {this.renderModal()}
        <Sidebar
          sidebar={(
            <DashboardSidebar
              keySelectValue={keySelectValue}
              nightMode={nightMode}
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
        </Sidebar>
      </div>
    );
  }
}

export default Dashboard;
