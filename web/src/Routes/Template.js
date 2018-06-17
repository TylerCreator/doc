import React, {Fragment} from 'react';
import { post } from 'axios';
import PropTypes from 'prop-types';
import {Link, Redirect, withRouter } from "react-router-dom";
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
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Reply from '@material-ui/icons/Reply';
import Drafts from '@material-ui/icons/Drafts';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Doc from '../Components/Doc';


const drawerWidth = 240;

const styles = theme => ({
  '@global': {
    'body': {
      'margin': 0 ,    // Make all links red.
    }
  },
  root: {
    flexGrow: 1,

    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  textField: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit*2,
    marginLeft: theme.spacing.unit*2,
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
  link:{
    textDecoration: "none",
  },
  counter:{
    textAlign: "center",
  },
  button:{
    color:"#880e4f",
    '&:hover': {
      backgroundColor: '#f9eaf2',
    },
  }
});

class Templates extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      template:{
        pages:[
          {
            url:'',
          }
        ]
      },
      mobileOpen: false,
      page:0,
      pageText:"1",
      image:null,
      redirect: false,
      path:'',
    },
    this.componentDidMount=this.componentDidMount.bind(this);
    this.handleDrawerToggle =this.handleDrawerToggle .bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.backPage = this.backPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.DownloadPDF = this.DownloadPDF.bind(this);
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
            pages {
              url,
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
        variables: {
          ids: this.props.match.params.id,
        },
      }),
    });
    const { data } = await resp.json();
    console.log(data)
    //if (!data && !data.courses) throw new Error('Failed to load course.');
    this.setState({
      template:data.templates[0],
    })
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  backPage(event) {
    let n;
    if (this.state.page===0)
      n = this.state.template.pages.length-1;
    else 
      n = (this.state.page-1)%this.state.template.pages.length;
    const image = new window.Image();
    if (this.state.template.pages && n>=0&&n<this.state.template.pages.length){
      image.src = this.state.template.pages[n].url;
      image.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState({
          page: n,
          image: image,
          pageText: ""+(n+1)
        }, function () {
          console.log(this.state.template.pages);
        })
      };
    }
  }
  nextPage(event) {
    let n = (this.state.page+1)%this.state.template.pages.length;
    const image = new window.Image();
    if (this.state.template.pages && n>=0&&n<this.state.template.pages.length){
      image.src = this.state.template.pages[n].url;
      image.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState({
          page: n,
          image: image,
          pageText: ""+(n+1)
        }, function () {
          console.log(this.state);
        })
      };
    }
  }
  pageChange(event) {
    let n = +event.target.value;
    this.setState({
      pageText: event.target.value
    })
    const image = new window.Image();
    if (this.state.template.pages && n-1>=0&&n-1<this.state.template.pages.length){
      image.src = this.state.template.pages[n-1].url;
      image.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState({
          page: n-1,
          image: image,
          pageText: ""+n
        }, function () {
          console.log(this.state.image);
        })
      };
    }
  }
  async DownloadPDF(){
    const url = "http://localhost:3001/download";
    const formData = new FormData();
    formData.append('template',this.state.template);
    post(url, {
      t: this.state.template,
      fields:[
        {
          id:'1',
          value:'hardcode'
        }
      ],
    })
    .then(function (response) {
      console.log(response.data);
      // this.context.router.transitionTo(response.data);
      // this.props.history.push(response.data)
      this.setState({
        path:response.data,
        redirect:true,
      }, function () {
        // this.props.history.push(response.data);
        // console.log(this.state.path,this.state.redirect);
      })
    })
    .catch(function (error) {
      //console.log(error.response);
    });
    
  }

  render() {
    
    if (this.state.redirect) {
      return <Redirect push to={this.state.path}/>;
    }
    const { classes, theme } = this.props;
    const {template,page} = this.state;
    console.log(template.data )
    const drawer = (
        
      <Fragment>
        <div className={classes.toolbar} />
        <Divider />
        <List>
        <Link className={classes.link} to="/">
          <ListItem button>
            <ListItemIcon>
              <Reply/>
            </ListItemIcon>
            <ListItemText>GO BACK</ListItemText>
          </ListItem>
        </Link>
        <Divider />
        {template.data ? template.data.map((d)=>
        
          <TextField
          id="textarea"
          label={d.label}
          placeholder="`Иванов Иван Иванович"
          helperText="ФИО в именительном падеже"
          multiline
          className={classes.textField}
          margin="normal"
        />
        ):<Fragment/>}
        
        </List>
        <Divider />
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Button color="secondary" className={classes.button} onClick={this.backPage}>
          <ChevronLeft className={classes.rightIcon}>send</ChevronLeft>
          </Button>
          <TextField type="text" value={this.state.pageText} onChange={this.pageChange} />
          <p>/{template.pages.length}</p>
          <Button color="secondary" className={classes.button} onClick={this.nextPage}>
          <ChevronRight className={classes.rightIcon}>send</ChevronRight>
          </Button>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Button color="primary" style={{flex: '1'}} className={classes.button} onClick={this.backPage}>
          SAVE
          </Button>
          <Button color="primary" style={{flex: '1'}} className={classes.button} onClick={this.DownloadPDF}>
          DOWNLOAD
          </Button>
        </div>
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
            <Typography variant="title" >
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
            <div>
              <Doc template={template} page={this.state.page}/>
            </div>
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

export default withRouter(withStyles(styles, { withTheme: true })(Templates));