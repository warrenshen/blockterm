// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import {
  withRouter,
}                          from 'react-router-dom';
import {
  AUTH_TOKEN_COOKIE,
  getItem,
  setItem,
}                          from '../services/cookie';
import * as STYLES         from '../constants/styles';
import El                  from '../components/El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '712px',
    margin: '0px auto',
  },
  nightMode: {
    color: 'white',
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '24px',
    marginTop: '24px',
  },
  sectionCard: {
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
    backgroundColor: '#fff',
  },
  sectionNightMode: {
    backgroundColor: 'black',
  },
  sectionText: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '12px',
  },
  submitButton: {
    border: `1px solid #000`,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '13px',
    padding: '8px 6px',
  },
  exchangeKeys: {

  },
  exchangeKey: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0px',
  },
  paragraph: {
    paddingTop: '6px',
  },
});

class ApiKeys extends PureComponent
{
  componentWillReceiveProps(nextProps)
  {
    if (getItem(AUTH_TOKEN_COOKIE) === null)
    {
      nextProps.history.push('/');
    }
  }

  submit()
  {
    const {
      apiKey,
      exchange,
      nightMode,
      secretKey,

      createExchangeKey,
      createNotificationSuccess,
    } = this.props;

    createExchangeKey(exchange, apiKey, secretKey)
      .then((response) => createNotificationSuccess({ position: 'bc', title: 'Exchange API key created.' }))
      .catch((error) => console.log(error));
  }

  renderForm()
  {
    const {
      apiKey,
      exchange,
      nightMode,
      secretKey,

      changeApiKey,
      changeExchange,
      changeSecretKey,
    } = this.props;

    const selectOptions = [
      {
        label: 'Binance',
        value: 'binance',
      },
      {
        label: 'Bittrex',
        value: 'bittrex',
      },
      // {
      //   label: 'Coinbase / GDAX',
      //   value: 'gdax',
      // },
    ];
    const isSubmitDisabled = !exchange || !apiKey || !secretKey;
    const onClickSubmit = (event) => {
      event.preventDefault();
      this.submit();
    };
    const onKeyPress = (event) => {
      if (event.key === 'Enter')
      {
        event.preventDefault();
        this.submit();
      }
    };

    return (
      <form className={css(styles.form)}>
        <div className={css(styles.formRow)}>
          <Select
            className={css(styles.select, styles.bolded)}
            placeholder={'Select exchange'}
            matchProp={'label'}
            menuContainerStyle={{ 'maxHeight': '412px' }}
            menuStyle={{ 'maxHeight': '412px' }}
            openOnFocus={true}
            optionClassName={css(styles.bolded, styles.options)}
            options={selectOptions}
            value={exchange}
            onChange={(option) => changeExchange(option ? option.value : null)}
          />
        </div>
        <div className={css(styles.formRow)}>
          <input
            className={css(styles.inputField, nightMode && styles.fieldNight)}
            placeholder='API key'
            required='required'
            value={apiKey}
            onChange={(event) => changeApiKey(event.target.value)}
          />
        </div>
        <div className={css(styles.formRow)}>
          <input
            className={css(styles.inputField, nightMode && styles.fieldNight)}
            placeholder='Secret key'
            required='required'
            value={secretKey}
            onChange={(event) => changeSecretKey(event.target.value)}
            onKeyPress={onKeyPress}
          />
        </div>
        <div className={css(styles.formRow)}>
          <button
            className={css(styles.bolded, styles.submitButton)}
            disabled={isSubmitDisabled}
            type='submit'
            onClick={onClickSubmit}
          >
            Create API exchange key
          </button>
        </div>
      </form>
    );
  }

  renderExchangeKey(exchangeKey)
  {
    const {
      nightMode,
    } = this.props;

    const {
      id,
      exchange,
      apiKey,
      secretKey,
    } = exchangeKey;

    return (
      <div className={css(styles.exchangeKey)} key={id}>
        <El
          nightMode={nightMode}
          type={'span'}
        >
          {exchange}
        </El>
        <El
          nightMode={nightMode}
          type={'span'}
        >
          {apiKey}
        </El>
      </div>
    );
  }

  render()
  {
    const {
      exchangeKeys,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <div
          className={css(
            styles.section,
            styles.sectionCard,
            nightMode && styles.sectionNightMode,
          )}
        >
          <El
            nightMode={nightMode}
            type={'h3'}
          >
            Add new exchange API key
          </El>
          <El
            nightMode={nightMode}
            style={styles.paragraph}
            type={'p'}
          >
            Add an exchange API key and we'll automatically sync your portfolio with your exchange balance.
          </El>
          {this.renderForm()}
        </div>
        <div
          className={css(
            styles.section,
            styles.sectionText,
          )}
        >
          <El
            nightMode={nightMode}
            type={'span'}
          >
            For extra security, please be sure to set your API keys to READ ONLY.
          </El>
        </div>
        <div
          className={css(
            styles.section,
            styles.sectionCard,
            nightMode && styles.sectionNightMode,
          )}
        >
          <El
            nightMode={nightMode}
            type={'h3'}
          >
            Active exchange API keys
          </El>
          <div className={css(styles.exchangeKeys)}>
            {
              exchangeKeys.map((exchangeKey) => this.renderExchangeKey(exchangeKey))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ApiKeys);
