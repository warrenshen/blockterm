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
  DASHBOARD_ITEM_KEYS,
  DASHBOARD_ITEM_KEY_TO_VALUES,
} from '../constants/items';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
          data={data[identifier.replace(/-/g, '')]}
          destroyDashboardItem={destroyDashboardItem}
          nightMode={nightMode}
          storeState={dashboard[id]}
        />
      </div>
    );
  }

  render()
  {
    const {
      changeKeySelectValue,
      changeValueSelectValue,
      dashboardItems,
      data,
      nightMode,
      keySelectValue,
      saveLayout,
      valueSelectValue
    } = this.props;
    console.log(keySelectValue);

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
      const validItems = dashboardItems.filter(
        (dashboardItem) => isIdentifierValid(dashboardItem.identifier)
      );

      const selectOptions = DASHBOARD_ITEM_KEYS.map((key) =>({
        label: key,
        value: key,
      }));
      return (
        <div className={css(styles.container)}>
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
          <div className={css(styles.sidebar)}>
            <Select
              options={selectOptions}
              onChange={(option) => changeKeySelectValue(option ? option.value : '')}
              value={keySelectValue}
            />
            {
              keySelectValue && (
                <Select
                  options={selectOptions}
                  onChange={(option) => changeValueSelectValue(option ? option.value : '')}
                  value={valueSelectValue}
                />
              )
            }
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
