// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DashboardItem from '../components/DashboardItem';
import * as STYLES from '../constants/styles';
import { isIdentifierValid } from '../constants/items.js'
import Select from 'react-select';
import {
  ITEM_KEY_TO_LABELS,
  ITEM_KEY_TO_VALUES,
  ITEM_VALUE_TO_LABELS,
  generateIdentifier,
} from '../constants/items';
import Sidebar from 'react-sidebar';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  gridContainer: {
    display: 'flex',
    flex: '1',
    backgroundColor: '#ececec',
    minHeight: '100vh',
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  gridNightContainer: {
    backgroundColor: STYLES.SOFTGRAY,
  },
  sidebar: {
    width: '256px',
    backgroundColor:'#fff',
    borderLeft: '1px solid #666',
    height: '100%', //might be overzealous
  },
  nightSidebar: {
    backgroundColor:STYLES.LIGHTNIGHT,
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
  },
});

class Dashboard extends PureComponent {

  renderItem(dashboardItem)
  {
    const {
      changeDashboardItemPlotRange,
      destroyDashboardItem,
      dashboard,
      data,
      nightMode,
      removeFromLayout,
    } = this.props;

    const {
      id,
      identifier,
      w,
      h,
      x,
      y,
    } = dashboardItem;

    const layout = {
      i: id,
      w: w,
      h: h,
      x: x,
      y: y,
      minW: 1,
      maxW: 8,
    };

    return (
      <div
        className={css(styles.item, nightMode && styles.nightMode)}
        data-grid={layout}
        key={id}
      >
        <DashboardItem
          changeDashboardItemPlotRange={changeDashboardItemPlotRange}
          dashboardItem={dashboardItem}
          data={data[identifier]}
          destroyDashboardItem={destroyDashboardItem}
          nightMode={nightMode}
          removeFromLayout={removeFromLayout}
          storeState={dashboard[id]}
        />
      </div>
    );
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
          className={css(styles.select, styles.bolded)}
          optionClassName={css(styles.bolded)}
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
          Add to dashboard
        </button>
      );
    }
  }

  render()
  {
    const {
      changeKeySelectValue,
      dashboardItems,
      data,
      keySelectValue,
      nightMode,
      sidebarActive,
      saveLayout,
    } = this.props;

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
      const validItems = dashboardItems.filter(
        (dashboardItem) => isIdentifierValid(dashboardItem.identifier)
      );

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
                  className={css(styles.select, styles.bolded)}
                  optionClassName={css(styles.bolded)}
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
            styles={{root: { height: '100%' }, overlay: overlayStyle, }}
          >
            <ResponsiveReactGridLayout
              className={css(styles.gridContainer, nightMode && styles.gridNightContainer)}
              cols={{ lg: 8, md: 8, sm: 4, xs: 4, xxs: 2 }}
              rowHeight={200}
              onLayoutChange={(layout, layouts) => saveLayout(layout)}
            >
              {
                dashboardItems.map(
                  (dashboardItem) => this.renderItem(dashboardItem))
              }
            </ResponsiveReactGridLayout>
          </Sidebar>
        </div>
      );
    }
  }
}

export default Dashboard;
