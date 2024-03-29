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
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: STYLES.SOFTGRAY,
  },
  select: {
    flex: '1',
  },
  container: {
    flex: '1',
    width: '100%',
  },
  row: {
    flex: '1',
    display: 'inline-flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightRow: {
    backgroundColor: '#000',
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
    padding: '10px 10px',
    display: 'flex',
  },
  comparable: {
    flex: 1,
    fontWeight: '700',
    paddingTop: '5px',
    //textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  nightComparable: {
    color: '#fff',
  },
  newComparable: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  },
  header: {
    display: 'inline-flex',
    zIndex: 2,
  },
  instruction: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '30px',
    color: "#777",
  },
  nightModeInstruction: {

  },
  addText: {
    'marginTop':'5px',
    'marginRight':'5px',
    'fontSize':'14px',
  },
  semibolded: {
    fontWeight: '500',
  },
});

class SubredditsCompare extends PureComponent
{
  renderOptions(subredditOptions, selectedSubreddits)
  {
    const {
      addSubredditId,
      nightMode,
    } = this.props;

    const selectedSubredditIds = selectedSubreddits.map(
      (subreddit) => subreddit.id
    );
    const selectOptions = subredditOptions
    .filter(
      (subreddit) => !selectedSubredditIds.includes(subreddit.id)
    ).map((subreddit) => ({
      label: subreddit.displayName,
      value: subreddit.id,
    }));

    return (
      <div className={css(styles.comparables)}>
        {
          selectedSubreddits.map((subreddit) => {
            return (
              <div
                className={css(styles.comparable, nightMode && styles.nightComparable)}
                key={subreddit.id}
              >
                {subreddit.displayName}
              </div>
            );
          })
        }
        {
          selectedSubreddits.length < 5 && (
            <div className={css(styles.newComparable)}>
              <El
                nightMode={nightMode}
                style={styles.addText}
                type={'h4'}
              >
                Add comparable:
              </El>
              <Select
                className={css(styles.select)}
                clearable={true}
                searchable={true}
                matchProp={'label'}
                options={selectOptions}
                onChange={(option) => addSubredditId(option.value)}
              />
            </div>
          )
        }
      </div>
    );
  }

  render()
  {
    const {
      data,
      changeActiveUserCountPlotRange,
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      activeUserCountPlotRange,
      commentCountPlotRange,
      postCountPlotRange,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={styles.header}>
          { data && data.allSubreddits && this.renderOptions(data.allSubreddits, data.subredditsByIds) }
        </div>
        <div className={css(styles.row, nightMode && styles.nightRow)}>
          <div className={css(styles.container)}>
            {
              data &&
              data.subredditsByIds &&
              data.subredditsByIds.length > 0 ?
              <SubredditsCompareBody
                subreddits={data.subredditsByIds}
                changeActiveUserCountPlotRange={changeActiveUserCountPlotRange}
                changeCommentCountPlotRange={changeCommentCountPlotRange}
                changePostCountPlotRange={changePostCountPlotRange}
                activeUserCountPlotRange={activeUserCountPlotRange}
                commentCountPlotRange={commentCountPlotRange}
                postCountPlotRange={postCountPlotRange}
                nightMode={nightMode}
              />
              :
              <div className={css(styles.instruction, styles.semibolded, nightMode && styles.nightModeInstruction)}>
                Select subreddits to compare using the above selection menu.<br />
                Graphs will then be rendered showing the comparison.
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SubredditsCompare;
