import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Inbox from '@material-ui/icons/Inbox';
import Drafts from '@material-ui/icons/Drafts';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,

    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    zIndex: 10000,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },

});

class Templates extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      templates:[],
      mobileOpen: false,
    }
  }

  async componentDidMount() {
    const resp = await fetch('//localhost:3001/graphql', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        query: `query templates($ids: [String]) {
          templates(ids: $ids) {
            id,
            name,
            width,
            height,
            pages,
            data {
              id,
              label,
              val,
            },
            rects {
              id,
              page,
              style,
            }
          }
        }`,
      }),
    });
    const { data } = await resp.json();
    console.log(data)
    //if (!data && !data.courses) throw new Error('Failed to load course.');
    this.setState({
      templates:data.templates,
    })
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
        
      <Fragment>
        <div className={classes.toolbar} />
        <Divider />
        <List>
            
        <Link className={classes.link} to="/">
            <ListItem button>
              <ListItemIcon>
                <Inbox/>
              </ListItemIcon>
              <ListItemText>Templates</ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link className={classes.link} to="/documents">
            <ListItem button>
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText>My documents</ListItemText>
            </ListItem>
          </Link>
        </List>
      </Fragment>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Documents
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography>
          
          </Typography>
        </main>
      </div>
    );
  }
}

Templates.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Templates);