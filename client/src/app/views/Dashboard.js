// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import DashboardGrid from '../components/DashboardGrid';
import * as STYLES from '../constants/styles';
import Select from 'react-select';
import {
  ITEM_KEY_TO_LABELS,
  ITEM_KEY_TO_VALUES,
  ITEM_VALUE_TO_LABELS,
  generateIdentifier,
} from '../constants/items';
import Sidebar from 'react-sidebar';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  gridNightContainer: {
    paddingTop: '4px',
    backgroundColor: STYLES.SOFTGRAY,
  },
  sidebar: {
    width: '256px',
    backgroundColor:'#fff',
    borderLeft: '1px solid #666',
    height: '100%', //might be overzealous
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
  placeholder: {
    width: '100%',
    height: '128px',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
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
    //paddingTop: 5px,
    margin: '10px',
    marginTop: '2px',
  },
  options: {
    borderBottom: '1px solid #ddd',
  },
});

var isScrolling;

class Dashboard extends PureComponent {

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
          placeholder={'Search Coin'}
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
      createDashboardItem,
      valueSelectValue,
    } = this.props;

    if (valueSelectValue)
    {
      return (
        <button
          className={css(styles.button)}
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
      return (
        <div className={css(styles.shield)}>

        </div>
      );
    }
  }

  render()
  {
    const {
      changeKeySelectValue,
      dashboard,
      dashboardAction,
      dashboardItems,
      data,
      keySelectValue,
      logDashboardActionStart,
      logDashboardActionStop,
      nightMode,
      removeFromLayout,
      scrollActive,
      sidebarActive,
      toggleSidebar,
      saveLayout,
    } = this.props;

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
      const overlayStyle = {
        transition: 'opacity .2s ease-out, visibility .2s ease-out',
        backgroundColor: `rgba(0,0,0,${nightMode ? 0.3 : 0.1})`,
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
                {this.renderSubmit()}
              </div>
            }
            docked={false}
            open={sidebarActive}
            pullRight={true}
            shadow={false}
            styles={
              {
                root: { height: '100%', overflow: 'visible', },
                overlay: overlayStyle,
                content: { overflowY: 'visible' },
            }}
          >
            {this.renderScrollShield()}
            <div className={css(styles.subContainer, nightMode && styles.gridNightContainer)}>
              <DashboardGrid
                dashboard={dashboard}
                dashboardAction={dashboardAction}
                dashboardItems={dashboardItems}
                data={data}
                logDashboardActionStart={logDashboardActionStart}
                logDashboardActionStop={logDashboardActionStop}
                nightMode={nightMode}
                toggleSidebar={toggleSidebar}
                removeFromLayout={removeFromLayout}
                saveLayout={saveLayout}
              />
              <div
                className={css(styles.placeholder, nightMode && styles.gridNightContainer)}
              >
                <div
                  className={css(styles.item, styles.addItem, styles.addToButton, nightMode && styles.nightMode)}
                >
                  <button
                    className={css(styles.button, nightMode && styles.darkAddButton)}
                    onClick={(event) => toggleSidebar()} >
                    Add Widget [+]
                  </button>
                </div>
              </div>
            </div>
          </Sidebar>
        </div>
      );
    }
  }
}

export default Dashboard;
