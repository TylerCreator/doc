import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import {Divider,Typography, Toolbar, AppBar, Drawer, Paper}from "material-ui";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import InboxIcon from "material-ui-icons/Inbox";
import DraftsIcon from "material-ui-icons/Drafts";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#0091EA",
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    //padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  link: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    textDecoration: "none"
  },
  menuText: {
    color: "inherit",
    textDecoration: "none"
  }
});
/*

function Templates(props) {
  const { classes } = props;
  
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `query templates($ids: [String]) {
        templates(ids: $ids) { id,
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
      variables: {
        ids: params.idCourse,
      },
    }),
  });
  const { data } = await resp.json();
  console.log(data)
  if (!data && !data.courses) throw new Error('Failed to load course.');
  */
 class Templates extends React.Component {
  
  static propTypes = {
    classes: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state={
      templates:[]
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
  render(){
    let classes=this.props.classes
  return (
    <div className={classes.root}>
    
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Documents
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <Link className={classes.link} to="/">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText className="menuText">Templates</ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link className={classes.link} to="/documents">
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText className="menuText">My documents</ListItemText>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Paper style={{width:'100%', overflow:'auto', margin:'0', maxHeight:'100%'}}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
          <Typography noWrap>
           
          </Typography>
          <ul>
            {this.state.templates.map((t)=>
            <li>{t.id}</li>)}
            {"You think water moves fast? You should see ice."}
            </ul>
          
      </main>
      </Paper>       
    </div>
    
  );
}
}


export default withStyles(styles)(Templates);
