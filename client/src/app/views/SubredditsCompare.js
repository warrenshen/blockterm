// @flow weak

import React, {
  PureComponent,
}                            from 'react';
import PropTypes             from 'prop-types';
import { StyleSheet, css }   from 'aphrodite';
import moment                from 'moment';
import { Link }              from 'react-router-dom';
import Select                from 'react-select';
import SubredditsCompareBody from '../components/SubredditsCompareBody';
import El                    from '../components/El';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    padding: '0% 15%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: '#232b2e',
  },
  container: {
    gridColumn: '3 / 7',
  },
  description: {
    paddingTop: '12px',
  },
  header: {
    display: 'flex',
    padding: '24px 0px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  headerRight: {
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  tokens: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
  },
  comparables: {
    width: '100%',
    padding: '24px 0px',
    display: 'flex',
  },
  comparable: {
    flex: 1,
  },
  newComparable: {
    width: '172px',
    display: 'flex',
    flexDirection: 'column',
  },
});

class SubredditsCompare extends PureComponent {

  renderOptions(subredditOptions, selectedSubreddits)
  {
    const {
      addSubredditId,
      nightMode,
    } = this.props;

    const selectOptions = subredditOptions.map((subreddit) => {
      return {
        label: subreddit.displayName,
        value: subreddit.id,
      };
    });

    return (
      <div className={css(styles.comparables)}>
        {
          selectedSubreddits.map((subreddit) => {
            return (
              <div className={css(styles.comparable)}>
                {subreddit.displayName}
              </div>
            );
          })
        }
        <div className={css(styles.newComparable)}>
          <h4>+ compare</h4>
          <Select
            clearable={false}
            searchable={true}
            value={''}
            options={selectOptions}
            onChange={(option) => addSubredditId(option.value)}
          />
        </div>
      </div>
    );
  }

  render()
  {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        { data && data.allSubreddits && this.renderOptions(data.allSubreddits, data.subredditsByIds) }
        <div className={css(styles.container)}>
          {
            data &&
            data.subredditsByIds &&
            data.subredditsByIds.length > 0 &&
            <SubredditsCompareBody subreddits={data.subredditsByIds} />
          }
        </div>
      </div>
    );
  }
}

export default SubredditsCompare;
