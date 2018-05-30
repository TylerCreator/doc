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
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 240;

const styles = theme => ({
  '@global': {
    'body': {
      'margin': 0 ,    // Make all links red.
    }
  },
  root: {
    flexGrow: 1,
    margin: 0,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    font: 'Formular bold',
    height: '100vh',
    [theme.breakpoints.up('md')]:{
      position:'absolute',
      
    }
  },
  appBar: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    font: 'Formular bold',
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
  link:{
    textDecoration: "none",
    
  },
  button:{
    color: '#880E4F',
  },
  floatButton:{
    [theme.breakpoints.up('sm')]:{
      bottom: 30,
      right: 10,
    },
    color: '#FFFFFF',
    backgroundColor:'#880E4F',
    position: 'absolute',
    bottom: 30,
    right: 10,
    zIndex: 10000,
    '&:hover': {
      backgroundColor:'#880E4F',
    },
  }
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
            pages{
              uri,
            },
            uri,
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
              <ListItemText>TEMPLATES</ListItemText>
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
              <ListItemText>DOCUMENTS</ListItemText>
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
            <Typography variant="title">
              DOCUMENTS
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
            <Grid container spacing={24}>
            {this.state.templates.map((t)=>
              <Grid item xs={12} sm={6} md={4} lg={3} key={t.id}>
              <Card className={classes.card}>
                <Link className={classes.link} to={`/templates/${t.id}`}>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {t.name}
                  </Typography>
                  <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
                </Link>
                <CardActions>
                  <Button className={classes.button} size="small" >
                    Share
                  </Button>
                  <Button className={classes.button} size="small" >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
              </Grid>)}
            </Grid>
            
          </Typography>
        </main>
        <Button variant="fab" className={classes.floatButton}>
          <AddIcon />
        </Button>
      </div>
      
    );
  }
}

Templates.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Templates);