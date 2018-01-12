// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Sidebar             from 'react-sidebar';
import * as STYLES from '../constants/styles';
import PROJECT_VERSION     from '../constants/items';
import Select from 'react-select';
import {
  ITEM_KEY_TO_LABELS,
  ITEM_KEY_TO_VALUES,
  ITEM_VALUE_TO_LABELS,
  generateIdentifier,
} from '../constants/items';
import El                  from '../components/El';
import DashboardTabs       from '../containers/DashboardTabs';
import FontAwesome    from 'react-fontawesome';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  sidebar: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '256px',
    backgroundColor:'#fff',
    borderLeft: '1px solid #666',
  },
  nightSidebar: {
    backgroundColor: STYLES.LIGHTNIGHT,
    borderLeft: '1px solid #BBB',
  },
  bolded: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '2px',
  },
  select: {
    borderBottom: '1px solid #666 !important',
    marginLeft: '-1px',
  },
  button: {
    width:'100%',
    fontWeight: '500',
    letterSpacing: '1px',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  nightButton: {
    color: 'white',
    backgroundColor: '#bbb',
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
  options: {
    borderBottom: '1px solid #ddd',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft:'5px',
  },
  darkHeader: {
    backgroundColor: '#000',
  },
  darkCloseButton: {
    backgroundColor: '#000',
    color: '#fff',
  },
  topHalf: {
    height: '300px',
    //backgroundColor: '#eeffee',
    borderBottom: `1px dashed ${STYLES.BORDERLIGHT}`,
  },
  bottomHalf: {
    padding: '5px 10px',
  },
  addToButton: {
    letterSpacing: '1px !important',
    fontSize: '12px',
    fontWeight: '700',
    borderBottom: '1px solid #777',
  },
  sidebarAddButtonNight: {
    //borderColor: '#ccc !important',
  },
  p: {
    fontSize: '13px',
  },
  ccVersion: {
    position: 'fixed',
    'bottom': '10px',
  },
  sidebarTitle: {
    fontWeight: '700',
    flex: '1',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '3px',
  },
});

var isScrolling;

class Dashboard extends Component {

  constructor(props)
  {
    super(props);

    const {
      changeScrollActive,
    } = props;

    this.handleScroll = (event) => {
      changeScrollActive(true);
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function() {
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

  addItem(event)
  {
    event.preventDefault();

    const {
      keySelectValue,
      sidebarMode,
      valueSelectValue,

      addToLayout,
      updateLayoutItem,
    } = this.props;

    const newIdentifier = generateIdentifier(keySelectValue, valueSelectValue);

    if (sidebarMode === 'add')
    {
      // Add a new dashboard item.
      addToLayout(newIdentifier);
    }
    else if (sidebarMode === 'edit')
    {
      // Edit an existing dashboard item.
      updateLayoutItem(newIdentifier);
    }
    else
    {
      if (process.env.NODE_ENV == 'dev')
      {
        console.log('Invalid sidebar mode');
      }
    }
  }

  renderValueSelect()
  {
    const {
      changeValueSelectValue,
      keySelectValue,
      valueSelectValue,
    } = this.props;

    if (keySelectValue)
    {
      const valueOptions = ITEM_KEY_TO_VALUES[keySelectValue];
      const selectOptions = valueOptions.map((value) => ({
        label: ITEM_VALUE_TO_LABELS[value] ? ITEM_VALUE_TO_LABELS[value] : value,
        value: value,
      }));
      return (
        <Select
          inputProps={{ id: 'widget_search_2' }}
          placeholder={'Search Specific'}
          className={css(styles.select, styles.bolded)}
          optionClassName={css(styles.bolded, styles.options)}
          options={selectOptions}
          onChange={(option) => changeValueSelectValue(option ? option.value : '')}
          value={valueSelectValue}
        />
      );
    }
  }

  renderSubmit()
  {
    const {
      valueSelectValue,
      nightMode,
      sidebarMode
    } = this.props;

    if (valueSelectValue)
    {
      return (
        <button
          className={css(styles.button, styles.addToButton, nightMode && styles.sidebarAddButtonNight)}
          onClick={(event) => this.addItem(event)}
        >
          {sidebarMode === 'edit' ? 'Edit Selected Widget' : 'Add to Dashboard'}
        </button>
      );
    }
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

  render()
  {
    const {
      changeDashboardItemState,
      changeKeySelectValue,
      changeSelectedTab,
      changeSidebarMode,
      keySelectValue,
      nightMode,
      scrollActive,
      sidebarMode,
    } = this.props;

    const overlayStyle = {
      transition: 'opacity .2s ease-out, visibility .2s ease-out',
      backgroundColor: `rgba(0, 0, 0, ${nightMode ? 0.4 : 0.18})`,
    };

    const selectOptions = Object.entries(ITEM_KEY_TO_LABELS).map((arr) => ({
      label: arr[1],
      value: arr[0],
    }));

    return (
      <div className={css(styles.container)}>
        <Sidebar
          sidebar={
            <div className={css(styles.sidebar, nightMode && styles.nightSidebar)}>
              <div className={css(styles.header, nightMode && styles.darkHeader)}>
                <El nightMode={nightMode} type={'h5'} style={styles.sidebarTitle}>
                  {sidebarMode === 'edit' ? 'Edit widget' : 'Add widget'}
                </El>
                <button
                  className={css(nightMode && styles.darkCloseButton)}
                  onClick={(event) => changeSidebarMode(null)}
                >
                  <FontAwesome name='close' className={css(styles.icon)}/>
                </button>
              </div>
              <div className={css(styles.topHalf)}>
                <Select
                  inputProps={{'id': 'widget_search'}}
                  placeholder={'Search Widget Type'}
                  className={css(styles.select, styles.bolded)}
                  optionClassName={css(styles.bolded, styles.options)}
                  options={selectOptions}
                  onChange={(option) => changeKeySelectValue(option ? option.value : '')}
                  value={keySelectValue}
                />
                {this.renderValueSelect()}
                {this.renderSubmit(nightMode)}
              </div>
              <div className={css(styles.bottomHalf)}>
                <El nightMode={nightMode} type={'h5'}>
                  Adding elements to dashboard:
                </El>
                <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
                  1) Enter the type of widget you would like to add, e.g. Market Overview, Candle Chart, Subreddit Posts, Subreddit Comments.
                </El>
                <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
                  2) Enter the widget specific type. For a candle chart, enter the ticker/symbol you are interested in. For example: BTCUSD, ETHUSD, LTCEUR, REQBTC, etc. For subreddits, enter the relevant subreddit name. For example: r/Bitcoin, r/Monero, r/Cryptocurrency, etc.
                </El>
                <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
                  3) Click 'Add to Dashboard'!
                </El>
                <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
                  4) Resize and reposition the widget how you see fit, and click the lock button if you would like to lock its configuration.
                </El>
              </div>
            </div>
          }
          docked={false}
          open={sidebarMode !== null}
          pullRight={true}
          shadow={true}
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
              },
            }
          }
        >
          {this.renderScrollShield()}
          <DashboardTabs />
        </Sidebar>
      </div>
    );
  }
}



export default Dashboard;
