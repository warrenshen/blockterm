import React                from 'react';
import { StyleSheet, css }  from 'aphrodite/no-important';
import { withRouter }       from 'react-router-dom';
import FontAwesome          from 'react-fontawesome';
import IconButton           from 'material-ui/IconButton';
import Menu, { MenuItem }   from 'material-ui/Menu';
import FormatListBulletedIcon from 'material-ui-icons/FormatListBulleted';

const ITEM_HEIGHT = 30;

const styles = StyleSheet.create({
  bulletIcon: {
    height: '3rem',
    width: '3rem',
  },
  bulletIconNight: {
    color: 'white',
  },
  menuItem: {
    fontWeight: '700 !important',
    textTransform: 'uppercase !important',
    fontSize: '13px !important',  //TODO: change this to 13 when portfolio is added to nav
    letterSpacing: '2px !important',
  },
  menuItemNight: {
    color: 'white',
  },
  paper: {
    maxHeight: ITEM_HEIGHT * 9,
    width: 160,
    backgroundColor: 'white',
    boxShadow: "-2px 3px 4px #c6c6c6"
  },
  paperNight: {
    backgroundColor: 'black',
    boxShadow: "-2px 3px 4px #4c4c4c"
  },
  icon: {
    marginLeft: '10px',
    marginTop: '3px',
    float: 'right',
    verticalAlign: 'middle'
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: '0.7',
  },
  disabledNight: {
    color: 'white'
  },

});



class MobileRightNavIcon extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (link) => {
    this.props.history.push(link)
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    let { nightMode, email, user, logout, client, options } = this.props;
    let paperStyle = Object.assign(
      {},
      styles.paper._definition,
      nightMode && styles.paperNight._definition
    );

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <FormatListBulletedIcon className={css(styles.bulletIcon, nightMode && styles.bulletIconNight)}/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{style: paperStyle}}
        >
          <MenuItem
            className={css(styles.menuItem, nightMode && styles.menuItemNight) }
            key={'dashboard'}
            onClick={this.handleClose.bind(this, '/')}
          >
            Dashboard
          </MenuItem>,
          {options.map((option, index) => (
            <MenuItem
              className={css(styles.menuItem, nightMode && styles.menuItemNight) }
              key={index}
              onClick={this.handleClose.bind(this, option.link)}
            >
              {option.label}
            </MenuItem>
          ))}
          {
            user ?
            [
              <MenuItem
                className={css(styles.menuItem, nightMode && styles.menuItemNight) }
                key={'portfolio'}
                onClick={this.handleClose.bind(this, '/portfolio')}
              >
                Portfolio
              </MenuItem>,
              <MenuItem
                className={css(styles.menuItem, nightMode && styles.menuItemNight) }
                key={'sign-out'}
                onClick={(event) => logOut(event, client)}
                label={email}
              >
                {email} | <FontAwesome name='sign-out' className={css(styles.icon)}/>
              </MenuItem>

            ] :
            [
              <div
                data-tip='LOGIN or JOIN to use portfolio.'
                data-place='bottom'
                data-type='info'
                data-effect='solid'
                data-class={css(styles.tooltip)}
                key={'portfolio'}
              >
                <MenuItem
                  className={css(styles.menuItem, nightMode && styles.menuItemNight) }
                  key={'portfolio'}
                  onClick={this.handleClose.bind(this, '/portfolio')}
                >
                  <div className={css(styles.disabled, nightMode && styles.disabledNight)}>
                    Portfolio
                    <FontAwesome name='lock' className={css(styles.icon)}/>
                  </div>
                </MenuItem>
            </div>,
            <MenuItem
              className={css(styles.menuItem, nightMode && styles.menuItemNight) }
              key={'login'}
              onClick={this.handleClose.bind(this, '/login')}
            >
              Login
            </MenuItem>,
            <MenuItem
              className={css(styles.menuItem, nightMode && styles.menuItemNight) }
              key={'join'}
              onClick={this.handleClose.bind(this, '/join')}
            >
              Join/FAQ
            </MenuItem>
            ]
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(MobileRightNavIcon);
