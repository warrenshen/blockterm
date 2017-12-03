// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import El from './El';

const styles = StyleSheet.create({
  container: {
    paddingTop: '6px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionRight: {
    paddingLeft: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
});

const SubredditWidget = ({
  nightMode,
  subreddit,
}) => {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.section)}>
        <img src={subreddit.imageUrl} width={48} height={48}></img>
      </div>
      <div className={css(styles.section, styles.sectionRight)}>
        <Link to={`/subreddit/${subreddit.id}`}>
          <El nightMode={nightMode} type={'span'}>
            {subreddit.displayName}
          </El>
        </Link>
      </div>
    </div>
  );
}

SubredditWidget.propTypes = {
  nightMode: PropTypes.bool.isRequired,
  subreddit: PropTypes.object.isRequired,
};

export default SubredditWidget;
