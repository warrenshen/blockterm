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
  },
  bolded: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '2px',
  },
  select: {
    borderBottom: '1px solid #666 !important',
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
    borderBottom: '2px solid #777',
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
      valueSelectValue,

      addToLayout,
    } = this.props;

    const identifier = generateIdentifier(keySelectValue, valueSelectValue);
    addToLayout(identifier);
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
          inputProps={{'id':'widget_search_2'}}
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

  renderSubmit(nightMode=true)
  {
    const {
      createDashboardItem,
      valueSelectValue,
    } = this.props;

    if (valueSelectValue)
    {
      return (
        <button
          className={css(styles.button, styles.addToButton, nightMode && styles.sidebarAddButtonNight)}
          onClick={(event) => this.addItem(event)}
        >
          Add to Dashboard
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
      keySelectValue,
      nightMode,
      scrollActive,
      sidebarActive,
      toggleSidebar,
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
                  2) Enter the widget specific type. For example the currency/coin you would like for a Candle Chart, or Subreddit.
                </El>
                <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
                  3) Click 'Add to Dashboard'!
                </El>
              </div>
            </div>
          }
          docked={false}
          open={sidebarActive}
          pullRight={true}
          shadow={true}
          transitions={false}
          onSetOpen={toggleSidebar}
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
