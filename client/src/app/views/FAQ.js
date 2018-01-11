import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import El from '../components/El';

import * as STYLES from '../constants/styles';
import FAQBody from '../components/FAQBody';

const styles = StyleSheet.create({
  faqPanel: {
    backgroundColor: '#fff',
    marginTop: '20px',
    padding: '15px 15px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    display:'flex',
    flexDirection:'column',
    minHeight: '450px',
  },
  panelsLightNight: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  boldedBottomHeavy: {
    fontWeight: '700',
    marginBottom: '8px',
  },
  column: {
    display:'flex',
    flex: '1',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  dashBorder: {
    borderRight: `1px dashed ${STYLES.BORDERLIGHT}`,
  },
  bolded: {
    fontWeight:'700',
    display: 'block',
  },
  para: {
    lineHeight: '24px',
  },
  a: {
    fontWeight: '500',
    textDecoration: 'underline',
  },
  nightA: {
    color: '#fff',
  },
  body: {
    margin: '0px 10px',
    display: 'flex',
    flex: '1',
  },
});

class FAQ extends PureComponent {

  render()
  {
    const {
      nightMode,
    } = this.props;

    return(
      <div className={css(styles.body)}>
        <FAQBody nightMode={nightMode} />
      </div>
    );
  }
}

export default FAQ;
