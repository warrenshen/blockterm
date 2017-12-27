// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Sidebar             from 'react-sidebar';
import * as STYLES from '../constants/styles';
import Select from 'react-select';
import {
  ITEM_KEY_TO_LABELS,
  ITEM_KEY_TO_VALUES,
  ITEM_VALUE_TO_LABELS,
  generateIdentifier,
} from '../constants/items';
import DashboardTabs       from '../components/DashboardTabs';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
      changeSelectedTab,
      dashboard,
      dashboardAction,
      dashboardItems,
      data,
      keySelectValue,
      logDashboardActionStart,
      logDashboardActionStop,
      nightMode,
      removeFromLayout,
      saveLayout,
      scrollActive,
      selectedTab,
      sidebarActive,
      toggleSidebar,
    } = this.props;

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
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
            shadow={true}
            transitions={false}
            onSetOpen={toggleSidebar}
            styles={
              {
                root: { height: '100%', overflowY: 'visible',  overflowX: 'hidden'},
                overlay: overlayStyle,
                content: { overflowY: 'visible' },
            }}
          >
            {this.renderScrollShield()}
            <DashboardTabs
              changeSelectedTab={changeSelectedTab}
              dashboard={dashboard}
              dashboardAction={dashboardAction}
              dashboardItems={dashboardItems}
              data={data}
              logDashboardActionStart={logDashboardActionStart}
              logDashboardActionStop={logDashboardActionStop}
              nightMode={nightMode}
              removeFromLayout={removeFromLayout}
              saveLayout={saveLayout}
              selectedTab={selectedTab}
              toggleSidebar={toggleSidebar}
            />
          </Sidebar>
        </div>
      );
    }
  }
}

export default Dashboard;
