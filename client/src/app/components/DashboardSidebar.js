// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import FontAwesome         from 'react-fontawesome';
import * as STYLES         from '../constants/styles';
import {
  ITEM_KEY_TO_LABELS,
  ITEM_KEY_TO_IMAGE_PREVIEWS,
  ITEM_KEY_TO_VALUES,
  ITEM_SUBREDDIT_VALUE_TO_LABELS,
  SUBREDDIT_POST_COUNTS,
  SUBREDDIT_COMMENT_COUNTS,
  generateIdentifier,
}                          from '../constants/items';
import DashboardSidebarTabs from '../containers/DashboardSidebarTabs';
import El                  from '../components/El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '256px',
    width: '40vw',
    backgroundColor:'#fff',
    borderLeft: '1px solid #666',
    zIndex: '4',
    overflow: 'scroll',
  },
  nightSidebar: {
    backgroundColor: STYLES.LIGHTNIGHT,
    borderLeft: '1px solid #BBB',
  },
  mode: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  bolded: {
    fontWeight: '500',
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
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`
  },
  darkHeader: {
    backgroundColor: '#000',
    borderBottom: `1px solid ${STYLES.BORDERDARK}`
  },
  darkCloseButton: {
    backgroundColor: '#000',
    color: '#fff',
  },
  topHalf: {
    //borderBottom: `1px dashed ${STYLES.BORDERLIGHT}`,
  },
  bottomHalf: {
    borderTop: `1px dashed ${STYLES.BORDERLIGHT}`,
    padding: '5px 10px',
  },
  addToButton: {
    letterSpacing: '1px !important',
    fontWeight: '500',
    borderBottom: '1px solid #777',
  },
  p: {
    fontSize: '13px',
  },
  sidebarTitle: {
    fontWeight: '500',
    flex: '1',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '3px',
  },
  widgetPreviews: {
    marginLeft: '-1px',
  },
  previewButton: {
    width: '33.33%',
    height: 'auto',
    padding: '0px 0px',
    backgroundColor: '#fff',
    marginTop: '-1px',
    marginLeft: '-1px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  previewButtonNight: {
    backgroundColor: '#000',
  },
  previewIcon: {
    width: '100%',
    height: 'auto',
    minWidth: '85px',
    minHeight: '85px',
    margin: '0 auto',
    verticalAlign: 'baseline',
    transition: 'all 0.2s',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  emphasize: {
    backgroundColor: STYLES.GOLD,
  },
});

class DashboardSidebar extends PureComponent
{
  static propTypes = {
    keySelectValue: PropTypes.string.isRequired,
    nightMode: PropTypes.bool.isRequired,
    sidebarMode: PropTypes.string,
    valueSelectValue: PropTypes.string.isRequired,

    addToLayout: PropTypes.func.isRequired,
    changeSidebarMode: PropTypes.func.isRequired,
    updateLayoutItem: PropTypes.func.isRequired,
  };

  constructor(props)
  {
    super(props);
    this.handleEscape = (event) => {
      if (event.key === 'Escape')
      {
        event.preventDefault();
        props.changeSidebarMode(null);
      }
    };
  }

  componentDidUpdate(prevProps)
  {
    const {
      keySelectValue,
      sidebarMode,
    } = this.props;

    // We add and remove event listeners here because this component
    // is not unmounted (due to use of react-sidebar library).
    if (sidebarMode !== null && prevProps.sidebarMode === null)
    {
      window.addEventListener('keyup', this.handleEscape);
    }
    else if (sidebarMode === null && prevProps.sidebarMode !== null)
    {
      window.removeEventListener('keyup', this.handleEscape);
    }

    if (prevProps.keySelectValue !== keySelectValue)
    {
      this.focusOnSpecificSelect();
    }
  }

  focusOnSpecificSelect()
  {
    const sidebarSpecificField = document.getElementById('widgetSearchSpecific');
    if (sidebarSpecificField) {
      sidebarSpecificField.focus();
    }
  }

  focusOnSubmitButton()
  {
    const submitButton = document.getElementById('dashboardActionButton');
    if (submitButton) {
      submitButton.focus();
    }
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
    this.focusOnSpecificSelect();
  }

  handleKeySelectChange(option)
  {
    const {
      changeKeySelectValue,
    } = this.props;

    changeKeySelectValue(option ? option.value : '');
  }

  handleValueSelectChange(option)
  {
    const {
      changeValueSelectValue,
    } = this.props;

    changeValueSelectValue(option ? option.value : '')
    .then(
      () => this.focusOnSubmitButton(),
    );
  }

  renderValueSelect()
  {
    const {
      keySelectValue,
      valueSelectValue,
    } = this.props;

    if (keySelectValue)
    {
      const valueOptions = ITEM_KEY_TO_VALUES[keySelectValue];
      const selectOptions = valueOptions.map((value) => {
        let label;
        if (keySelectValue === SUBREDDIT_POST_COUNTS || keySelectValue === SUBREDDIT_COMMENT_COUNTS)
        {
          label = ITEM_VALUE_TO_LABELS[value];
        }
        else
        {
          label = value;
        }
        return {
          label: label,
          value: value,
        };
      });
      return (
        <Select
          className={css(styles.select, styles.bolded)}
          inputProps={{ id: 'widgetSearchSpecific' }}
          placeholder={'Search Specific'}
          matchProp={'label'}
          menuContainerStyle={{ 'maxHeight': '412px' }}
          menuStyle={{ 'maxHeight': '412px' }}
          openOnFocus={true}
          optionClassName={css(styles.bolded, styles.options)}
          options={selectOptions}
          value={valueSelectValue}
          onChange={(option) => this.handleValueSelectChange(option)}
        />
      );
    }
  }

  renderSubmit()
  {
    const {
      nightMode,
      sidebarMode,
      valueSelectValue,
    } = this.props;

    if (valueSelectValue)
    {
      return (
        <button
          id='dashboardActionButton'
          className={css(styles.button, styles.addToButton, styles.emphasize, nightMode && styles.sidebarAddButtonNight)}
          onClick={(event) => this.addItem(event)}
        >
          {sidebarMode === 'edit' ? 'Edit Selected Widget' : 'Add to Dashboard'}
        </button>
      );
    }
  }

  renderWidgetPreview(widgetIdentifier, index)
  {
    const {
      nightMode,

      changeKeySelectValue,
    } = this.props;

    const currentMode = nightMode ? 'night' : 'day';
    const onClick = (event) => changeKeySelectValue(widgetIdentifier);

    if (ITEM_KEY_TO_IMAGE_PREVIEWS[widgetIdentifier])
    {
      return (
        <button
          className={css(styles.previewButton, nightMode && styles.previewButtonNight)}
          key={index}
          onClick={onClick}
        >
          <img
            alt={index}
            className={css(styles.previewIcon)}
            src={`https://s3-us-west-2.amazonaws.com/blockterm-cdn/widget-previews/${ITEM_KEY_TO_IMAGE_PREVIEWS[widgetIdentifier] + '_' + currentMode}.jpg`}
          />
          <El
            nightMode={nightMode}
            style={STYLES.styles.subtitle}
            type={'span'}
          >
            {ITEM_KEY_TO_IMAGE_PREVIEWS[widgetIdentifier]}
          </El>
        </button>
      );
    }
  }

  renderWidgetMode()
  {
    const {
      keySelectValue,
      nightMode,
    } = this.props;

    const selectOptions = Object.entries(ITEM_KEY_TO_LABELS).map((arr) => ({
      label: arr[1],
      value: arr[0],
    }));

    return (
      <div className={css(styles.mode)}>
        <div className={css(styles.topHalf)}>
          <Select
            inputProps={{'id': 'widget_search'}}
            placeholder={'Search Widget Type'}
            className={css(styles.select, styles.bolded)}
            matchProp={'label'}
            menuContainerStyle={{ 'maxHeight': '412px' }}
            menuStyle={{ 'maxHeight': '412px' }}
            optionClassName={css(styles.bolded, styles.options)}
            options={selectOptions}
            onChange={(option) => this.handleKeySelectChange(option)}
            value={keySelectValue}
          />
          {this.renderValueSelect()}
          {this.renderSubmit(nightMode)}
        </div>
        {
          !keySelectValue && (
            <div className={css(styles.widgetPreviews)}>
              {
                selectOptions.map(
                  (option, index) => this.renderWidgetPreview(option.value, index)
                )
              }
            </div>
          )
        }
        <div className={css(styles.bottomHalf)}>
          <El nightMode={nightMode} type={'h5'}>
            Adding elements to dashboard:
          </El>
          <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
            <b>1)</b> Enter the type of widget you would like to add, e.g. Market Overview, Candle Chart, Subreddit Posts, Subreddit Comments.
          </El>
          <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
            <b>2)</b> Enter the widget specific type. For a candle chart, enter the ticker you are interested in. For example: BTCUSD, ETHBTC, NEOBTC, etc.
          </El>
          <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
            <b>3)</b> Click 'Add to Dashboard'!
          </El>
          <El nightMode={nightMode} type={'p'} className={css(styles.p)}>
            <b>4)</b> Resize and reposition the widget how you see fit, and click the lock button if you would like to lock its configuration.
          </El>
        </div>
      </div>
    );
  }

  render()
  {
    const {
      nightMode,
      sidebarMode,

      changeSidebarMode,
    } = this.props;

    const selectOptions = Object.entries(ITEM_KEY_TO_LABELS).map((arr) => ({
      label: arr[1],
      value: arr[0],
    }));

    let sidebarTitle;
    if (sidebarMode === 'edit')
    {
      sidebarTitle = 'Edit widget';
    }
    else if (sidebarMode === 'add')
    {
      sidebarTitle = 'Add widget';
    }
    else
    {
      sidebarTitle = 'Add/edit tabs';
    }

    return (
      <div
        className={css(styles.container, nightMode && styles.nightSidebar)}
      >
        <div className={css(styles.header, nightMode && styles.darkHeader)}>
          <El nightMode={nightMode} type={'h5'} style={styles.sidebarTitle}>
            {sidebarTitle}
          </El>
          <button
            className={css(nightMode && styles.darkCloseButton)}
            onClick={(event) => changeSidebarMode(null)}
          >
            <FontAwesome name='close' className={css(styles.icon)}/>
          </button>
        </div>
        {
          sidebarMode === 'add' || sidebarMode === 'edit' ?
            this.renderWidgetMode() :
            <DashboardSidebarTabs />
        }
      </div>
    );
  }
}

export default DashboardSidebar;
